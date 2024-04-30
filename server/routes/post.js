const express = require("express");
const { query } = require("../helpers/db.js");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs').promises;

const postRouter = express.Router();

//16.Apr Modification:
//added homepage post
postRouter.get("/homepost", async (req, res) => {
  try {
    const result = await query("select post.* ,users.username from post inner join users on post.user_id = users.user_id ");
    const rows = result.rows ? result.rows : [];
    res.status(200).json(rows);
  } catch (error) {
    res.statusMessage = error;
    res.status(500).json({ error: error });
  }
});

// 9.Apr Modification:
// added register code
postRouter.post("/create", async (req, res) => {
  try {
    let file_name = "";
    if (req.files && req.files.image) {
      const file = req.files.image;
      // 生成一个基于时间戳的新文件名
      const newFileName = Date.now() + "_" + file.name;
      const uploadPath = `./public/images/${newFileName}`;

      // 异步移动文件，确保文件保存后再执行数据库操作
      await file.mv(uploadPath);
      file_name = newFileName;
    }

    // for testing
    console.log(req.body.title, req.body.content, file_name, req.body.user_id);

    const sql = 'INSERT INTO post (title, content, image_name, user_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await query(sql, [req.body.title, req.body.content, file_name, req.body.user_id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error in creating post:", error);
    res.status(500).json({ message: "Internal server error", details: error.message });
  }
});

// 13.Apr create the function for my post
postRouter.post("/myPost", async (req, res) => {
  const { username } = req.body;

  // for testing
  // console.log(username);

  try {
    const userResult = await query(
      "SELECT user_id FROM users WHERE username = $1",
      [username]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userResult.rows[0].user_id;

    // for testing
    // console.log(userId);

    const postResult = await query(
      "SELECT post_id, title, content, time,image_name FROM post WHERE user_id = $1",
      [userId]
    );
    res.status(200).json(postResult.rows);
  } catch (error) {
    console.error("Error cathing post:", error);
    res.status(500).json({ error: error.message });
  }

  // for testing
  // console.log(postResult);
});

// 16.Apr create the function to see the post detail
postRouter.get("/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const postResult = await query(
      "SELECT u.username AS post_username, p.post_id, p.title, p.content, p.time AS post_time, p.image_name, c.comment_id, c.text, c.time AS comment_time, cu.username AS comment_username FROM post p JOIN users u ON p.user_id = u.user_id LEFT JOIN comment c ON p.post_id = c.post_id LEFT JOIN users cu ON c.user_id = cu.user_id WHERE p.post_id = $1",
      [postId]
    );
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    } else {
      const postDetail = {
        post_id: postResult.rows[0].post_id,
        title: postResult.rows[0].title,
        content: postResult.rows[0].content,
        time: postResult.rows[0].post_time,
        image_name: postResult.rows[0].image_name,
        username: postResult.rows[0].post_username,
        comments: postResult.rows.map(row => ({
          comment_id: row.comment_id,
          text: row.text,
          time: row.comment_time,
          username: row.comment_username
        })).filter(comment => comment.comment_id !== null)
      };
      return res.status(200).json(postDetail);
    }
  } catch (error) {
    console.error("Error catching post:", error);
    res.status(500).json({ error: error.message });
  }

  // for testing
  // console.log(postDetail);
});





// the following parts are waiting for the confirmation from the frontend
// for post: edit/delete
// for comment: insert/edit/delete

// 16.Apr create the backend for editing post
postRouter.post("/editPost", async (req, res) => {
  const { title, content, postId, username } = req.body;

  // for testing
  // console.log(title, content, postId, username);

  try {
    const checkResult = await query("SELECT user_id FROM post WHERE post_id = $1", [postId]);
    const userId = checkResult.rows[0].user_id;

    const userResult = await query("SELECT username FROM users WHERE user_id = $1", [userId]);
    const user = userResult.rows[0].username;

    if (user !== username) {
      return res.status(403).json({ error: "You don't have permission to edit." })
    }

    // Check if there is an image file in the request
    let file_name = ""
    if (req.files && req.files.image) {
        const file = req.files.image
        file_name = file.name
        const uploadPath = `./public/images/${file_name}`
        await mv(file.tempFilePath, uploadPath)
    }

    const editSql = "UPDATE post SET title = $1, content = $2, image_name = $3, time = CURRENT_TIMESTAMP WHERE post_id = $4";
    const editResult = await query(editSql, [title, content, file_name, postId]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error editing post:", error);
    res.status(500).json({ error: error.message });
  }
  // for testing
  // console.log(editResult);
});

// create the backend for deleting post
postRouter.delete("/deletePost/:postId", async (req, res) => {
  // const { postId, username } = req.body;
  const { username } = req.query;
  const { postId } = req.params;

  // for testi
  // console.log(postId, username);

  try {
    const checkResult = await query("SELECT user_id FROM post WHERE post_id = $1", [postId]);
    const userId = checkResult.rows[0].user_id;

    const userResult = await query("SELECT username FROM users WHERE user_id = $1", [userId]);
    const user = userResult.rows[0].username;

    if (user !== username) {
      return res.status(403).json({ error: "You don't have permission to delete." })
    } else {
      await query("DELETE FROM post WHERE post_id = $1", [postId]);
      res.status(200).json({ success: true, message: "Post deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: error.message });
  }
});

// create the backend for inserting comment
postRouter.post("/insertComment", async (req, res) => {
  const { postId, username, text } = req.body;

  // for testing
  // console.log(postId, username, text);

  try {
    const userResult = await query("SELECT user_id FROM users WHERE username = $1", [username]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const userId = userResult.rows[0].user_id;

    const commentSql = "INSERT INTO comment (text, user_id, post_id) VALUES ($1, $2, $3) RETURNING *";
    const commentResult = await query(commentSql, [text, userId, postId]);
    res.status(200).json(commentResult.rows[0]);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: error.message });
  }
  // for testing
  // console.log(commentResult);
});

// create the backend for editing comment
postRouter.post("/editComment", async (req, res) => {
  const { postId, username, commentId, text } = req.body;

  // for testing
  // console.log(postId, username, commentId, text);

  try {
    const checkResult = await query("SELECT user_id FROM comment WHERE comment_id = $1", [commentId]);
    // const commentPostId = checkResult.rows[0].post_id;
    const userId = checkResult.rows[0].user_id;

    const userResult = await query("SELECT username FROM users WHERE user_id = $1", [userId]);
    const user = userResult.rows[0].username;

    if (user !== username) {
      return res.status(403).json({ error: "You don't have permission to edit." })
    } else {
      const editSql = "UPDATE comment SET text = $1, time = CURRENT_TIMESTAMP WHERE comment_id = $2";
      const editResult = await query(editSql, [text, commentId]);
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("Error editing post:", error);
    res.status(500).json({ error: error.message });
  }
  // for testing
  // console.log(editResult);
});

// create the backend for deleting comment
postRouter.delete("/deleteComment/:comment_id", async (req, res) => {
  // const { username, comment_id } = req.body;
  const { username } = req.query;
  const { comment_id } = req.params;

  // for testing
  console.log(username, comment_id);

  try {
    const checkResult = await query("SELECT user_id FROM comment WHERE comment_id = $1", [comment_id]);
    const userId = checkResult.rows[0].user_id;
    console.log(userId)

    const userResult = await query("SELECT username FROM users WHERE user_id = $1", [userId]);
    const user = userResult.rows[0].username;

    if (user !== username) {
      return res.status(403).json({ error: "You don't have permission to delete." })
    } else {
      await query("DELETE FROM comment WHERE comment_id = $1", [comment_id]);
      res.status(200).json({ success: true, message: "Comment deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  postRouter,
};
const express = require("express");
const { query } = require("../helpers/db.js");

const postRouter = express.Router();

//16.Apr Modification:
//added homepage post
postRouter.get("/homepost", async (req, res) => {
  try {
    const result = await query("select * from post");
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
  const { title, content, username } = req.body;
  // for testing
  // console.log(username);
  // console.log(title);
  // console.log(content);

  try {
    const userResult = await query(
      "SELECT user_id FROM users WHERE username = $1",
      [username]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userResult.rows[0].user_id;

    const postSql =
      "INSERT INTO post (title, content, user_id) VALUES ($1, $2, $3) RETURNING *";
    const postResult = await query(postSql, [title, content, userId]);
    res.status(200).json(postResult.rows[0]);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: error.message });
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
      "SELECT title, content, time FROM post WHERE user_id = $1",
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

  // for testing
  // console.log(postId);

  try {
    const postResult = await query(
      "SELECT title, content, time FROM post WHERE post_id = $1",
      [postId]
    );
    // for testing
    // console.log(postResult);
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    } else {
      const postDetail = postResult.rows[0];
      return res.status(200).json(postDetail);
    }
  } catch (error) {
    console.error("Error cathing post:", error);
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
    } else {
      const editSql = "UPDATE post SET title = $1, content = $2 , time = CURRENT_TIMESTAMP WHERE post_id = $3";
      const editResult = await query(editSql, [title, content, postId]);
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("Error editing post:", error);
    res.status(500).json({ error: error.message });
  }
  // for testing
  // console.log(editResult);
});

// create the backend for deleting post
postRouter.post("/deletePost", async (req, res) => {
  const { postId, username } = req.body;

  // for testing
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
postRouter.post("/deleteComment", async (req, res) => {
  const { username, commentId } = req.body;

  // for testing
  // console.log(postId, username, commentId);

  try {
    const checkResult = await query("SELECT user_id FROM comment WHERE comment_id = $1", [commentId]);
    const userId = checkResult.rows[0].user_id;

    const userResult = await query("SELECT username FROM users WHERE user_id = $1", [userId]);
    const user = userResult.rows[0].username;

    if (user !== username) {
      return res.status(403).json({ error: "You don't have permission to delete." })
    } else {
      await query("DELETE FROM comment WHERE comment_id = $1", [commentId]);
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
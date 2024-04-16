const express = require("express");
const { query } = require("../helpers/db.js");

const postRouter = express.Router();

//16.Apr Modification:
//added homepage post
postRouter.get("/homepost",async(req,res)=>{
  try{
    const result = await query('select * from post')
    const rows = result.rows?result.rows:[]
    res.status(200).json(rows)
  }catch(error){
    res.statusMessage = error
    res.status(500).json({error:error})
  }
})



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
      "INSERT INTO post (title, content, user_id, time) VALUES ($1, $2, $3, NOW()) RETURNING *";
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
  console.log(username);

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
    console.log(userId);

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
  console.log(postResult);
});

module.exports = {
  postRouter,
};

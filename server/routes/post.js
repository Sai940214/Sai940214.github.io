const express = require('express')
const { query } = require('../helpers/db.js')

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f1536be (0411 modified by this version)
const postRouter = express.Router()

// 9.Apr Modification:
// added register code
postRouter.post("/create", async (req, res) => {
    const { title, content, username } = req.body;
<<<<<<< HEAD

    try {
         // for testing
        //  console.log(username)
        //  console.log(title)
        //  console.log(content)
=======
     // for testing
     console.log(username)
     console.log(title)
     console.log(content)

    try {
        
>>>>>>> f1536be (0411 modified by this version)
         
        const userResult = await query("SELECT user_id FROM users WHERE username = $1", [username]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const userId = userResult.rows[0].user_id;

        const postSql = "INSERT INTO post (title, content, user_id, time) VALUES ($1, $2, $3, NOW()) RETURNING *";
        const postResult = await query(postSql, [title, content, userId]);
        res.status(200).json(postResult.rows[0]);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: error. message });
    }
});

module.exports = {
    postRouter
<<<<<<< HEAD
=======
const blogRouter = express.Router()

blogRouter.get("/",async (req,res) => {
  try {
    const sql = 'select * from post'
    const result = await query(sql)
    const rows = result.rows ? result.rows : []
    res.status(200).json(rows)
  } catch(error) {
    res.statusMessage = error
    res.status(500).json({error: error})
  }
})

module.exports = {
    blogRouter
>>>>>>> cf04460 (user.js增加 server改变)
=======
>>>>>>> f1536be (0411 modified by this version)
  }
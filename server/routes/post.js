const express = require('express')
const { query } = require('../helpers/db.js')

const postRouter = express.Router()

// 9.Apr Modification:
// added register code
postRouter.post("/create", async (req, res) => {
    const { title, content, username } = req.body;
     // for testing
     console.log(username)
     console.log(title)
     console.log(content)

    try {
        
         
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
  }
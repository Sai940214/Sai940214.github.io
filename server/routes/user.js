const express = require('express')
const { query } = require('../helpers/db.js')
const bcrypt = require('bcrypt');

const userRouter = express.Router()

userRouter.post("/login",async(req,res) => {
    try{
        const sql ="select * from users where username=$1"
        const result = await query(sql,[req.body.username])
        if(result.rowCount === 1){
            if (result. rows[0].password === req.body.password) {
                res. status (200).json (result. rows [0])
                } else {
                res.statusMessage = 'Invalidnlogin'
                res.status(401). json({error:'Invalid login'})
                }
             }else{
                res.statusMessage = 'Invalid login'
                res.status(401).json({error:'Invalid login'})
                }
            }catch (error) {
                res.statusMessage = error
                res.status(500).json({error: error})}
        })

// 6.Apr Modification:
// added register code
userRouter.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const sql = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) returning user_id";
        const result = await query(sql, [username, email, password]);
        res.status(200).json({ user_id: result.rows[0].user_id });
    } catch (error) {
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});

// 7.Apr Modification:
// check email address has existed in the database
userRouter.post("/check-email", async (req, res) => {
    try {
        const email = req.body.email;
        // Check if the email exists
        const emailExistsSql = "SELECT * FROM users WHERE email = $1";
        const emailExistsResult = await query(emailExistsSql, [email]);

        if (emailExistsResult.rowCount === 1) {
            res.status(200).json({ message: 'email has already existed in the database' });
        } else {
            res.status(201).json({ error: 'email does not exist' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// check username has existed in the database
userRouter.post("/check-username", async (req, res) => {
    try {
        const username = req.body.username;
        // Check if the username exists
        const usernameExistsSql = "SELECT * FROM users WHERE username = $1";
        const usernameExistsResult = await query(usernameExistsSql, [username]);

        if (usernameExistsResult.rowCount === 1) {
            res.status(200).json({ message: 'username has already existed in the database' });
        } else {
            res.status(201).json({ error: 'username does not exist' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Request password reset
userRouter.post("/reset-password", async (req, res) => {
    try {
        const email = req.body.email;
        const newPassword = req.body.newPassword; // Assuming newPassword is provided in the request body
        // Check if the email exists
        const userExistsSql = "SELECT * FROM users WHERE email = $1";
        const userExistsResult = await query(userExistsSql, [email]);

        if (userExistsResult.rowCount === 1) {
            const updatePasswordQuery = "UPDATE users SET password = $1 WHERE email = $2";
            await query(updatePasswordQuery, [newPassword, email]);
            res.status(200).json({ message: 'Password updated successfully' });
        } else {
            res.status(404).json({ error: 'User with this email not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    userRouter
  }
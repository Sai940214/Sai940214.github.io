const express = require('express')
const { query } = require('../helpers/db.js')


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

// Request password reset
userRouter.post("/reset", async (req, res) => {
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
})


          
 




module.exports = {
    userRouter
  }
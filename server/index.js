<<<<<<< HEAD
const express = require('express')
const cors = require('cors')
const { userRouter } = require('./routes/user.js')
const { postRouter } = require('./routes/post.js')
=======
<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routes/user.js");
const { postRouter } = require("./routes/post.js");
=======
const express = require('express')
const cors = require('cors')
const { userRouter } = require('./routes/user.js')
const { blogRouter } = require('./routes/post.js')
const { postRouter } = require('./routes/post.js')
>>>>>>> 5f09368 (user.js增加 server改变)
>>>>>>> 9ac4bf1 (user.js增加 server改变)

const port = 3001
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

<<<<<<< HEAD
app.use('/user',userRouter) 
app.use('/post',postRouter)
=======
<<<<<<< HEAD
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
=======
app.use('/user',userRouter) 
>>>>>>> 9ac4bf1 (user.js增加 server改变)

app.listen(port,() => {
  console.log(`Server is listening on port ${port}`)
})
<<<<<<< HEAD
=======
>>>>>>> 5f09368 (user.js增加 server改变)
>>>>>>> 9ac4bf1 (user.js增加 server改变)

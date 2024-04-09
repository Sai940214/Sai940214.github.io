const express = require('express')
const cors = require('cors')
const { userRouter } = require('./routes/user.js')
const { blogRouter } = require('./routes/post.js')

const port = 3001
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/user',userRouter) 
app.use('/',blogRouter)

app.listen(port,() => {
  console.log(`Server is listening on port ${port}`)
})

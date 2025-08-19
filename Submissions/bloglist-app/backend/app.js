require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware')


const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(console.log("CONNECTED TO DATABASE"))
  .catch(error => console.log(error.message))

app.use(middleware.getTokenFrom)
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if(process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(express.static('dist'))

module.exports = app
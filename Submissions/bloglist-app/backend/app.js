require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')

const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(console.log("CONNECTED TO DATABASE"))
  .catch(error => console.log(error.message))

app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app
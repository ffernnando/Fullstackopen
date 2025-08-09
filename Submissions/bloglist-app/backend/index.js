const express = require('express')
const mongoose = require('mongoose')

// ------------------------------------------------ ENVIRONMENT VARIABLES ------------------------------------------------ 
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

const app = express()

// ------------------------------------------------ MongoDB + Mongoose SETUP ------------------------------------------------ 
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})
const Blog = mongoose.model('Blog', blogSchema)
mongoose.connect(MONGODB_URI)
  .then(console.log("CONNECTED TO DATABASE"))
  .catch(error => console.log(error.message))



app.use(express.json())

// ------------------------------------------------ ROUTE HANDLING ------------------------------------------------ 
app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
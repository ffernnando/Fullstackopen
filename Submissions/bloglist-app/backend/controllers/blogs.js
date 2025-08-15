const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user')
  response.json(result)
})

blogRouter.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id).populate('user')
  response.json(result)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if(body.title === undefined || body.url === undefined){
    return response.status(400).json({ error : 'title or url undefined' }).end()
  }
  console.log("USSSSSSSER: ", user)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  
  if(blog.user === undefined || !(blog.user.toString() === user._id.toString()) ){
    return response.status(401).json({ error: 'unauthorized' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).json(blog)
})

blogRouter.put('/:id', async (request, response) => {
  const oldBlog = await Blog.findById(request.params.id)
  oldBlog.likes = request.body.likes
  response.status(201).json(await oldBlog.save())

})

module.exports = blogRouter
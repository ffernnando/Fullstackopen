const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  response.json(await Blog.find({}))
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  if(body.title === undefined || body.url === undefined){
    return response.status(400).end()
  }
  const blog = new Blog(request.body)
  response.status(201).json(await blog.save())
})

module.exports = blogRouter
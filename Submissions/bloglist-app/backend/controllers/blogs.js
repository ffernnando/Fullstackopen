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

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const oldBlog = await Blog.findById(request.params.id)
  console.log(oldBlog)
  oldBlog.likes = request.body.likes
  response.status(201).json(await oldBlog.save())

})

module.exports = blogRouter
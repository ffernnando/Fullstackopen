const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')

const mongoose = require('mongoose')
const Blog = require('../models/blog')
const app = require('../app')
const { blogList, blogsInDb } = require('./blog_list')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogList)
  //console.log(blogList)
})

test('get returns full list of blogs', async () => {
  const blogsBefore = await blogsInDb()

  const response = await api.get('/api/blogs/')
  assert.strictEqual(blogsBefore.length, response.body.length)
})

test('unique identifier of blog posts is named "id"', async () => {
  const blogs = await blogsInDb()
  //console.log(blogs)
  //Includes _id
  let invalidID = () => { 
    let invalid = false
    for(let x of blogs){
      if(Object.getOwnPropertyNames(x).includes('_id')){
        invalid = true
      }
    }
    return invalid
  }
  //Object.keys(blogs)
  //console.log("Invalid ID? ", invalidID())
  assert.strictEqual(invalidID(), false)
})

test('POST request successfully create new blog posts', async () => {
  const blogsBefore = await blogsInDb()
  //console.log("BLOGS BEFORE: ", blogsBefore)
  const newBlog = {
    title: "Critique of the critical critique",
    author: "Max Stirner",
    url: "www.random.org",
    likes: 5
  }
  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAfter = await blogsInDb()
  //console.log("BLOGS AFTER: ", blogsAfter)
  //console.log(`Blog count before: ${blogsBefore.length} | After: ${blogsAfter.length}`)
  const hasNewBlogTitle = () => {
    let contains = false
    for(let x of blogsAfter){
      Object.values(x).includes(newBlog.title) ? contains = true : contains = false      
    }
    return contains
  }
  //console.log("New blog title: ", newBlog.title)
  //console.log("New blog title in later list: ", hasNewBlogTitle())
  assert(blogsAfter.length > blogsBefore.length)
  assert(hasNewBlogTitle())

})

test('if "likes" property is missing from the request, it will default to 0', async () => {
  const newBlog = {
    title: "Thus spoke Yakub",
    author: "Friedrich Ebert",
    url: "www.mumbaischizoasylum.lul"
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAfter = await blogsInDb()
  //console.log(blogsAfter)
  assert.strictEqual(blogsAfter.find(blog => blog.title === newBlog.title).likes, 0)
})

describe('Tests related to creating new blogs', () => {
  test('if the title is missing from request data, backend responds with 400 Bad request', async () => {
    const blogNoTitle = {
      author: "Bruno Bauer",
      url: "www.mumbaischizoasylum.lul",
      likes: 48
    }
    await api
      .post('/api/blogs/')
      .send(blogNoTitle)
      .expect(400)
  })

  test('if the url is missing from request data, backend responds with 400 Bad request', async () => {
    const blogNoURL = {
      title: "48 laws of cognitive dissonance",
      author: "Andrew Husler",
      likes: 48
    }
    await api
      .post('/api/blogs/')
      .send(blogNoURL)
      .expect(400)
  })
})

after(async () => {
  mongoose.connection.close()
})
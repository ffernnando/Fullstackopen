const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  try {
    await Blog.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
  } catch (error) {
    console.error('RESET ERROR:', error)
    response.status(500).json({ error: error.message })
  }
})

module.exports = router
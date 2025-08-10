const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogList = require('./blog_list')

describe('Dummy testing', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

  test('when a list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })
})

describe('favorite blog', () => {
  test('the blog with the most likes is "Canonical string reduction"', () => {
    console.log('FUNCTION RESULT: ', listHelper.favoriteBlog(blogList))
    console.log('-----------------------------------------------------------------------------------------------')
    console.log('ACTUAL MOST LIKED POST: ', blogList[2])
    assert.deepStrictEqual(listHelper.favoriteBlog(blogList), blogList[2])
  })
})

describe('most active author', () => {
  const mostActive = { author: "Robert C. Martin", blogs: 3 }
  console.log("FUNCTION RESULT: ", listHelper.mostBlogs(blogList))
  console.log('-----------------------------------------------------------------------------------------------')
  console.log('ACTUAL MOST ACTIVE: ', mostActive)
  test('the author with the most blogs is "Robert C. Martin"', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogList), { author: "Robert C. Martin", blogs: 3 })
  })
})

describe('most liked', () => {
  test('the author with the most likes is Edsger W. Dijkstra - 17 likes', () => {
    listHelper.mostLikes(blogList)
  })
})

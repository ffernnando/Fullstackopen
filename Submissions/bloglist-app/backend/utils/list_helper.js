//const blogList = require('../tests/blog_list')
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, item) => {
    return item.likes >= max.likes ? item : max
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  const blogsPerAuthor = _.countBy(blogs, 'author')
  let mostActive = {author:"", blogs:0} 
  for(let x in blogsPerAuthor){
    if(blogsPerAuthor[x] > mostActive.blogs){
      mostActive.author = x
      mostActive.blogs = blogsPerAuthor[x] 
    }
  }
  return mostActive
}

const mostLikes = (blogs) => {
  let authors = blogs.map(blog => blog.author)
  authors = [...new Set(authors)]
  const authorsWithLikes = []
  for(let x of authors){
    authorsWithLikes.push({author: x, likes: 0})
  }
  
  for(let a of blogs){
    for(let i = 0; i < authorsWithLikes.length; i++){
      if(a.author === authorsWithLikes[i].author){
        authorsWithLikes[i].likes += a.likes
      }
    }
  } 
  
  return authorsWithLikes.reduce((max, curr) => {
      return curr.likes > max.likes ? curr : max
    }, authorsWithLikes[0])
}

//console.log(mostLikes(blogList))

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
import BlogList from '../components/BlogList'
import Togglable from '../components/Togglable'
import AddNewBlogForm from '../components/BlogForm'
import Blog from '../components/Blog'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import BlogContext from '../BlogContext'

const BlogView = ({ blog }) => {
  const [Blogs, newBlogMutation, likeBlogMutation, deleteBlogMutation] =
    useContext(BlogContext)
  const [nameOfUser, setNameOfUser] = useState('')

  useEffect(() => {
    const name = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    ).name
    console.log(name)
    setNameOfUser(name)
  }, [])

  const handleLikeClick = async () => {
    likeBlogMutation.mutate(blog)
  }

  const handleRemoveClick = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }
    deleteBlogMutation.mutate(blog)
  }

  if (!blog) {
    return <div></div>
  }

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} Likes
        <button onClick={handleLikeClick}>Like</button>
      </div>
      <div>{blog.user ? `Added by ${blog.user?.name}` : ''}</div>
      <div>
        {nameOfUser === blog.user?.name ? (
          <button onClick={handleRemoveClick}>remove</button>
        ) : (
          ' '
        )}
      </div>
    </div>
  )
}

export default BlogView

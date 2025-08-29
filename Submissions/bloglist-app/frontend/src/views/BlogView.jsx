import BlogList from '../components/BlogList'
import Togglable from '../components/Togglable'
import AddNewBlogForm from '../components/BlogForm'
import Blog from '../components/Blog'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import BlogContext from '../BlogContext'
import Comments from '../components/Comments'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const BlogView = ({ blog }) => {
  const [Blogs, newBlogMutation, likeBlogMutation, deleteBlogMutation] =
    useContext(BlogContext)
  const [nameOfUser, setNameOfUser] = useState('')
  const navigate = useNavigate()

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
    navigate('/')
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
        <Button onClick={handleLikeClick} style={{ marginLeft: '1em' }}>
          Like
        </Button>
      </div>
      <div>
        {blog.user ? `Added by ${blog.user?.name}` : ''}

        {nameOfUser === blog.user?.name ? (
          <Button onClick={handleRemoveClick} style={{ marginLeft: '1em' }}>
            remove
          </Button>
        ) : (
          ' '
        )}
      </div>
      <Comments blog={blog} />
    </div>
  )
}

export default BlogView

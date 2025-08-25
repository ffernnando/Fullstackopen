import { useContext, useEffect } from 'react'
import { useState } from 'react'
import BlogContext from '../BlogContext'

const Blog = ({ blog }) => {
  const [Blogs, newBlogMutation, likeBlogMutation, deleteBlogMutation] = useContext(BlogContext)

  const [detailsVisible, setDetailVisibility] = useState(false)
  const [nameOfUser, setNameOfUser] = useState('')
  const buttonLabel = detailsVisible ? 'hide' : 'view'
  const detailsStyle = { display: detailsVisible ? '' : 'none' }

  useEffect(() => {
    const name = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    ).name
    console.log(name)
    setNameOfUser(name)
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleDetails = () => {
    setDetailVisibility(!detailsVisible)
  }

  const handleLikeClick = async () => {
    /* const updatedBlog = await blogService.changeLikes(blog)
    setBlogs(
      blogs.map((b) =>
        b.id === blog.id ? { ...updatedBlog, user: blog.user } : b
      )
    )
    showNotification(`liked '${updatedBlog.title}'`) */
    likeBlogMutation.mutate(blog)
  }

  const handleRemoveClick = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }
    /* await blogService.deleteOne(blog)
    setBlogs(blogs.filter((x) => x.id !== blog.id)) */
    deleteBlogMutation.mutate(blog)
  }

  return (
    <div style={blogStyle} className='blogClass'>
      <div className='alwaysVisible'>
        {blog.title} {blog.author}
        <button onClick={handleDetails} id='detailsBtn'>
          {' '}
          {buttonLabel}{' '}
        </button>{' '}
        <br />
      </div>

      <div style={detailsStyle} className='togglableVisibility'>
        {blog.url} <br />
        likes: {blog.likes} <button onClick={handleLikeClick}>like</button>{' '}
        <br />
        {blog.user?.name} <br />
        {nameOfUser === blog.user?.name ? (
          <button onClick={handleRemoveClick}>remove</button>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Blog

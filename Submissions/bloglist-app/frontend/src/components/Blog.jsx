import { useState } from "react"

const Blog = ({ blog, setBlogs, blogs, blogService}) => {
  const [detailsVisible, setDetailVisibility] = useState(false)

  const buttonLabel = detailsVisible ? 'hide' : 'view'
  const detailsStyle = { display: detailsVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDetails = () => {
    setDetailVisibility(!detailsVisible)
  }

  const handleLikeClick = async () => {
    const updatedBlog = await blogService.changeLikes(blog)
    setBlogs(blogs.map(b =>
      b.id === blog.id ? { ...updatedBlog, user: blog.user } : b
    ))
  }

  const handleRemoveClick = async () => {
    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      return
    }
    await blogService.deleteOne(blog)
    setBlogs(blogs.filter(x => x.id !== blog.id))
  }

  return(
    <div style={ blogStyle }>
      <div className="alwaysVisible">
        { blog.title } { blog.author }
        <button onClick={ handleDetails } id="detailsBtn"> { buttonLabel } </button> <br/>
      </div>

      <div style={detailsStyle} className="togglableVisibility">
        { blog.url } <br/>
        likes: { blog.likes } <button onClick={handleLikeClick}>like</button> <br/>
        { blog.user?.name } <br/>
        <button onClick={handleRemoveClick}>remove</button>
      </div>
    </div>
  )
}

export default Blog

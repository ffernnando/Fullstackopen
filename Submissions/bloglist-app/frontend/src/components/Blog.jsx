import { useEffect, useState } from "react"
import blogService from "../services/blogs"


const Blog = ({ blog, setBlogs, blogs }) => {
  const [detailsVisible, setDetailVisibility] = useState(false)
  const [user, setUser] = useState(null)
  const [likes, setLikes] = useState(null)
  
  const buttonLabel = detailsVisible ? 'hide' : 'view'
  const detailsStyle = { display: detailsVisible ? '' : 'none' }

  useEffect(() => {
    const fetchData = async () => {
      const result = await blogService.getOne(blog.id)
      setUser(result.user.name)
      setLikes(blog.likes)
    }
    fetchData()
  }, [])


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
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
  }

  const handleRemoveClick = async () => {
    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      return null
    }
    const res = await blogService.deleteOne(blog)
    const newBlogs = blogs.filter(x => x.id !== blog.id)
    setBlogs(newBlogs)
    console.log('RES: ', res)
  }

  return(
    <div style={ blogStyle }>
      { blog.title } { blog.author } 
      <button onClick={ handleDetails }> { buttonLabel } </button> <br/>
      <div style={detailsStyle}>
        { blog.url } <br/>
        likes: { blog.likes } <button onClick={handleLikeClick}>like</button> <br/>
        { user } <br/>
        <button onClick={handleRemoveClick}>remove</button>
      </div>
      
    </div> 
  ) 
}

export default Blog
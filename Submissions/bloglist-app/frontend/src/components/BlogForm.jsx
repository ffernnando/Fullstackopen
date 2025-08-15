import { useState } from "react"
import blogService from '../services/blogs'

const AddNewBlogForm = ({ blogs, setBlogs, showNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateNew = (event) => {
    event.preventDefault()
    try{
      const newBlog = { title: title, author: author, url: url }
      blogService.createNew(newBlog)
      setBlogs(blogs.concat(newBlog))
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception)
      showNotification('error creating a new blog')
    }
    
  }

  return(
    <form onSubmit={handleCreateNew}>
      <div>title: <input type='text' name='Title' value={title} onChange={({target}) => setTitle(target.value)}/></div>
      <div>author: <input type='text' name='Author' value={author} onChange={({target}) => setAuthor(target.value)}/></div>
      <div>url: <input type='text' name='Url' value={url} onChange={({target}) => setUrl(target.value)}/></div>
      <button>create</button>
    </form>
  )
  
}

export default AddNewBlogForm
import { useState } from 'react'

const AddNewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateNew = (event) => {
    event.preventDefault()
    createBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={handleCreateNew}>
      <div>title: <input data-testid='title' type='text' name='Title' placeholder='Title...' value={title} onChange={({ target }) => setTitle(target.value)}/></div>
      <div>author: <input data-testid='author' type='text' name='Author' placeholder='Author...' value={author} onChange={({ target }) => setAuthor(target.value)}/></div>
      <div>url: <input data-testid='url' type='text' name='Url' placeholder='URL...' value={url} onChange={({ target }) => setUrl(target.value)}/></div>
      <button>create</button>
    </form>
  )
}

export default AddNewBlogForm
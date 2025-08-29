import { useContext, useState } from 'react'
import BlogContext from '../BlogContext'
import { Form, Button } from 'react-bootstrap'

const AddNewBlogForm = () => {
  const [, newBlogMutation, ,] = useContext(BlogContext)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateNew = (event) => {
    event.preventDefault()
    //createBlog(title, author, url)

    newBlogMutation.mutate({ title, author, url })
    console.log('form input: ', title, author, url)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form onSubmit={handleCreateNew}>
        <Form.Group>
          <Form.Label>Title: </Form.Label>
          <Form.Control
            data-testid='title'
            type='text'
            name='Title'
            placeholder='Title...'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author: </Form.Label>
          <Form.Control
            data-testid='author'
            type='text'
            name='Author'
            placeholder='Author...'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url: </Form.Label>
          <Form.Control
            data-testid='url'
            type='text'
            name='Url'
            placeholder='Url...'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Create
        </Button>
      </Form>
  )
}

export default AddNewBlogForm

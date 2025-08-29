import { useState } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Form, Button, InputGroup, ListGroup } from 'react-bootstrap'

const Comments = ({ blog }) => {
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()
  console.log('blog:', blog)

  const fetchComments = async () => {
    console.log('blog we fetchin with: ', blog)
    const res = await blogService.getCommentList(blog)
    console.log('res: ', res)
    return res
  }
  const addComment = async ({ blog, content }) => {
    //console.log('addComment - content: ', content)
    //console.log('addComment - blog: ', blog)
    const res = await blogService.createComment({ blog, content })
    //console.log('addComment - res: ', res)
    return res
  }

  const commentList = useQuery({
    queryKey: ['comments'],
    queryFn: fetchComments,
  })

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: (newComment) => {
      console.log('---------------------SUCCESS!!!---------------------')
      queryClient.setQueryData(['comments'], (oldComments) => {
        return [...oldComments, newComment]
      })
    },
    onError: (error) => {
      console.log('ERROR: ', error)
    },
  })

  //Add usequery etc. for handling the state of contents
  //Add mutation for adding comments which will refresh the display of comments on success

  const handleAddComment = (event) => {
    event.preventDefault()
    console.log('Handler - blog: ', blog)
    addCommentMutation.mutate({ blog, content })
    setContent('')
  }
  console.log('commentList.data: ', commentList.data)
  return (
    <div>
      <h3>comments</h3>
      <Form onSubmit={handleAddComment}>
        <InputGroup>
          <Form.Control
            type='text'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button>add comment</Button>
        </InputGroup>
      </Form>
      <ListGroup>
        {commentList.data?.map((c) => (
          <ListGroup.Item key={c.id}>{c.content}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}
export default Comments

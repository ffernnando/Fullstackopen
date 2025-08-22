import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNewAnecdote, updateAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { showNotification } from '../NotificationContext'


const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const dispatch = useContext(NotificationContext).notificationDispatch

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createNewAnecdote,
    onSuccess: (newAnecdote) => {
      console.log('onSuccess: ', newAnecdote)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote).sort((a, b) => b.votes - a.votes))
      showNotification(dispatch, `anecdote '${newAnecdote.content}' added`)
    },
    onError: (error) => {
      console.log(error)
      showNotification(dispatch, error.response.data.error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
    
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={ onCreate }>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

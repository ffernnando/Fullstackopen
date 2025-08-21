import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
      mutationFn: updateAnecdote,
      onSuccess: (updatedAnecdote) => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        const updatedList = anecdotes.filter(a => a.id !== updatedAnecdote.id).concat(updatedAnecdote).sort((a, b) => b.votes - a.votes)
        queryClient.setQueryData(['anecdotes'], updatedList)
      }
    })

  const handleVote = (anecdote) => {
    console.log('Anecd: ', anecdote)
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    console.log('New anecdote: ', newAnecdote)
    updateAnecdoteMutation.mutate(newAnecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isLoading) {
    console.log('LOADING')
    return(<div>loading anecdotes...</div>)
  }

  if (result.isError) {
    console.log('ERROR')
    return(<div>anecdote service not available due to problems in server</div>)
  } 

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

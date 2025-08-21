import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecContent.value
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote)
    dispatch(createAnecdote(newAnecdote))
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div><input name='anecContent' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
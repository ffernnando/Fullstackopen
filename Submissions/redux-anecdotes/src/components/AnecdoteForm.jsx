import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecContent.value
    dispatch(createAnecdote(content))
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
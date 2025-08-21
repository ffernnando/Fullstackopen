import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { updateLikes } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
  
  const dispatch = useDispatch()
  
  const handleVote = (anecdote) => {
      dispatch(updateLikes(anecdote))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }
  
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
 
  return(
    <div>
      {filter === ''
        ? anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)
        : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())).map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote}/>)
    }
    </div>
  )
}


export default AnecdoteList
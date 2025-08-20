import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  
  const dispatch = useDispatch()
  
  const handleVote = ({ id, content }) => {
      dispatch(vote(id))
      dispatch(setNotification(content))
      setTimeout(() => {
        dispatch(removeNotification(''))
      }, 5000)
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
        : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())).map(anecdote => (
            <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => handleVote(anecdote.id)}>vote</button>
                </div>
              </div>
          )
        )
    }
    </div>
  )
}


export default AnecdoteList
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  
  const filteredList = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  console.log(filteredList)

  const handleVote = (id) => {
      dispatch(vote(id))
  }

  return(
    <div>
      {filter === ''
        ? anecdotes.map(anecdote =>
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
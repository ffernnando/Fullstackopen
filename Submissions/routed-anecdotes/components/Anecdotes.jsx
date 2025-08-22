import { Link } from "react-router-dom"

export const AnecdoteDetails = ({ anecdote }) => {
  return (
    <div>
      <h3>{anecdote.author}</h3>
      <i>{anecdote.content}</i>
      <p>Source: <a href={anecdote.info}>{anecdote.info}</a></p>
      <p>votes: {anecdote.votes}</p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => {
          const url = `/anecdotes/${anecdote.id}`
          return (
            <li key={anecdote.id}>
              <Link to={url}>{anecdote.content}</Link>
            </li>
          )
        })
        }
      </ul>
    </div>
  )
}
export default AnecdoteList
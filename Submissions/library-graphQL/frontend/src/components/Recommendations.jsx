import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'
import { CURRENT_USER } from '../queries'

const Recommendations = () => {
  const user = useQuery(CURRENT_USER).data?.me
  const books = useQuery(ALL_BOOKS).data?.allBooks

  const filteredBooks = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: user?.favoriteGenre },
  }).data?.booksByGenre

  if (!user) {
    return <div> Loading... </div>
  }

  if (!filteredBooks) {
    return <div> Loading... </div>
  }
  console.log('user: ', user)

  return (
    <div>
      <h3>recommendations</h3>
      <table>
        <thead>
          <tr>
            <td>
              books in your favorite genre <b>{user.favoriteGenre}</b>
            </td>
          </tr>
          <tr>
            <td>author</td>
            <td>published</td>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((rb) => {
            return (
              <tr key={rb.title}>
                <td>{rb.title}</td>
                <td>{rb.author.name}</td>
                <td>{rb.published}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations

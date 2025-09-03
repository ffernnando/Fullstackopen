import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'
import { CURRENT_USER } from '../queries'
import { useNavigate } from 'react-router-dom'

const Recommendations = () => {
  const books = useQuery(ALL_BOOKS).data?.allBooks
  const [recommendedBooks, setRecommendedBooks] = useState([])
  const user = useQuery(CURRENT_USER).data?.me
  const navigate = useNavigate()

  useEffect(() => {
    if (books) {
      console.log('favoriteGenre: ', user.favoriteGenre)
      const filteredBooks = books.filter((b) =>
        b.genres.includes(user.favoriteGenre)
      )
      console.log('filteredBooks: ', filteredBooks)
      setRecommendedBooks(filteredBooks)
    }
  }, books)

  if (!user) {
    return <div> Loading... </div>
  }

  if (!recommendedBooks) {
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
          {recommendedBooks.map((rb) => {
            
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

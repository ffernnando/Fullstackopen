import { gql, useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'
import { useEffect, useState } from 'react'

const Books = () => {
  const books = useQuery(ALL_BOOKS).data?.allBooks
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  //const [selectedBooks, setSelectedBooks] = useState([])
  const filteredBooks = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
  }).data?.booksByGenre
  console.log('filteredBooks: ', filteredBooks)

  console.log('books: ', books)

  useEffect(() => {
    if (books) {
      const genres = []
      books?.forEach((b) => {
        b.genres.forEach((g) => {
          if (!genres.includes(g)) {
            genres.push(g)
          }
        })
      })
      setGenres(genres)
    } else {
      console.log('Books stil not loaded...')
    }
  }, [books])

  const handleFilterClick = ({ target }) => {
    const genre = target.value
    selectedGenre === genre ? setSelectedGenre('') : setSelectedGenre(genre)
    console.log('Clicked: ', selectedGenre)
  }

  if (!filteredBooks) {
    console.log('loading!')
    return <div>Loading...</div>
  }
  console.log('this happens!')
  console.log('Genres: ', genres)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {!genres ? (
          <></>
        ) : (
          genres.map((g) => (
            <button key={g} onClick={handleFilterClick} value={g}>
              {g}
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export default Books

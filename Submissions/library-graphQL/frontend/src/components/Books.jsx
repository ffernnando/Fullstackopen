import { gql, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'

const Books = () => {
  const books = useQuery(ALL_BOOKS).data?.allBooks
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedBooks, setSelectedBooks] = useState([])

  console.log('books: ', books)

  //Neka nije v redu z ovim, trebaš dodati još stvarnu logiku za filtriranje - nabaciš useState filtered books i
  //tam ih pohraniš i ako nije null onda displayaš njih, a inače sve - books. Nemam blage ali dok se kao hotloada
  //i refresha kod onda se dodaju ovi žanrovi ali nemam blage
  useEffect(() => {
    if (books) {
      const genres = []
      books?.forEach((b) => {
        console.log('Inside first foreach')
        b.genres.forEach((g) => {
          console.log('Inside second foreach')
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

  useEffect(() => {
    if (selectedGenre) {
      const filteredBooks = books.filter((b) =>
        b.genres.includes(selectedGenre)
      )
      setSelectedBooks(filteredBooks)
    } else {
      setSelectedBooks(books)
    }
  }, [books, selectedGenre])

  const handleFilterClick = ({ target }) => {
    const genre = target.value
    setSelectedGenre(genre)
    console.log('Clicked: ', selectedGenre)
  }

  if (!selectedBooks) {
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
          {selectedBooks.map((a) => (
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

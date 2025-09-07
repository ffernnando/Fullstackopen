import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { useSubscription } from '@apollo/client'
import { ALL_AUTHORS, BOOK_ADDED, BOOKS_BY_GENRE } from './queries'
import { ALL_BOOKS } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      return seen.has(item.title) ? false : seen.add(item.title)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    if (!allBooks) return { allbooks: [addedBook] }
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, (data) => {
        if (!data) return { allBooks: [addedBook] } // cache was empty
        return {
          allBooks: data.allBooks.concat(addedBook),
        }
      })

      addedBook.genres.forEach((genre) => {
        client.cache.updateQuery(
          { query: BOOKS_BY_GENRE, variables: { genre } },
          (data) => {
            if (!data) return null // cache didn’t have this query yet
            return {
              booksByGenre: data.booksByGenre.concat(addedBook),
            }
          }
        )
      })

      client.cache.updateQuery({ query: ALL_AUTHORS }, (cached) => {
        if (!cached) return null

        // If author exists, bump bookCount
        const existingAuthor = cached.allAuthors.find(
          (a) => a.name === addedBook.author.name
        )
        if (existingAuthor) {
          return {
            allAuthors: cached.allAuthors.map((a) =>
              a.name === addedBook.author.name
                ? { ...a, bookCount: a.bookCount + 1 }
                : a
            ),
          }
        }

        // Otherwise, add new author
        return {
          allAuthors: cached.allAuthors.concat({
            ...addedBook.author,
            bookCount: 1,
          }),
        }
      })
    },
  })

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button>
          <Link to='/'>authors</Link>
        </button>
        <button>
          <Link to='/books'>books</Link>
        </button>

        {token ? (
          <div>
            <button>
              <Link to='/addbook'>add book</Link>
            </button>
            <button>
              <Link to='/recommended'>recommended</Link>
            </button>
            <button onClick={handleLogout}>logout</button>
          </div>
        ) : (
          <button>
            <Link to='/login'>login</Link>
          </button>
        )}
      </div>

      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/addbook' element={<NewBook />} />
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
        <Route path='/recommended' element={<Recommendations />} />
      </Routes>
    </div>
  )
}

export default App

/*
---------------------------------- User login ---------------------------------- 
1. Make login mutation request in the frontend
2. Make the login form which will use said login mutation
3. Implement the newly created form in the App as well as a logout button

---------------------------------- Adding token to header ---------------------------------- 
1. Import createHttpLink and setContext - from @apollo/client/link/context
2. Create "authLink" with setContext which takes the token from the localStorage and returns
   the headers with the addition of the authorization token if the token exists
3. Make a httpLink with the previously used uri
4. Change the ApollOClient so that the link (instead of uri) is: authLink.concat(httpLink)

-------------------------------------------- Updating cache -------------------------------------------- 
1. Where you need to update the cache, such as adding new persons, you add the update
   parameter to the useMutation hook
2. In the update parameter, which takes two args (cache, response - response from the mutation), you use
   cache.updateQuery({ query: query which needs to be updated }, (query that can be destructured to get the data)) =>
    in the arrow function, you returnt the updated query data
*/

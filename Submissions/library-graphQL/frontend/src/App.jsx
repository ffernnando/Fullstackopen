import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recommendations from './components/Recommendations'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

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
        <Route path='/recommended' element={<Recommendations />}/>
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

import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import Notify from './components/Notify'
import { ALL_PERSONS, PERSON_ADDED } from './queries'
import LoginForm from './components/LoginForm'

export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson))
    }
  })
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  useSubscription(PERSON_ADDED, {
    onData: ({ data, client }) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)

      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
    }
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
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
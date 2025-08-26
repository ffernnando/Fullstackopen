import { useContext, createContext, useReducer } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationContext from './NotificationContext'


const UserContext = createContext()

const UserReducer = (state, action) => {
  switch (action.type) {
    case 'LOG_IN': {
      return action.payload
    }
    case 'LOG_OUT': {
      return null
    }
    default:
      return state
  }
}



export const UserContextProvider = (props) => {
  const [, , showNotification] = useContext(NotificationContext)
  const [user, userDispatch] = useReducer(UserReducer, null)

  const getUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const currUser = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOG_IN', payload: currUser })
      blogService.setToken(currUser.token)
    }
  }

  const userLogin = async (username, password) => {
    try {
      const result = await loginService.login(username, password)
      console.log('RESULT DATA: ', result)
      blogService.setToken(result.token)

      userDispatch({ type: 'LOG_IN', payload: result })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(result))
      showNotification('successfully logged in')
    } catch (exception) {
      showNotification('error logging in')
    }
  }

  const userLogout = () => {
    userDispatch({ type: 'LOG_OUT', payload: null })
    window.localStorage.removeItem('loggedBlogappUser')
    showNotification('successfully logged out')
  }

  //make methods to work with userDispatch and then pass them down via the context in order
  //to avoid cluttering other parts of the app with this logic
  return (
    <UserContext.Provider value={[user, getUser, userLogin, userLogout]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext

import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import AddNewBlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'
import { useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()

  const [user, setUser] = useState(null)

  const [notification, , showNotification] = useContext(NotificationContext)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    showNotification('successfully logged out')
  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <div>
          <Togglable buttonLabel='login'>
            <LoginForm setUser={setUser} />
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <BlogList />

          <hr></hr>
          <Togglable buttonLabel='new blog'>
            <AddNewBlogForm />
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App

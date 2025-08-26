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
import UserContext from './UserContext'
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import UserView from './views/UserView'
import UserListView from './views/UserListView'
import BlogView from './views/BlogView'

const App = () => {
  const queryClient = useQueryClient()
  const [user, getUser, , userLogout] = useContext(UserContext)

  const [notification, , ] = useContext(NotificationContext)

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Router>
      <Notification notification={notification} />
      {user === null ? (
        <div>
          <Togglable buttonLabel='login'>
            <LoginForm />
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={userLogout}>logout</button>
          </p>
          
        </div>
      )}
      <UserListView />

      <Routes>
        <Route path='/users' element={<UserListView />} />
        <Route path='/users/:id' element={<UserView />} />
        <Route path='/blogs' element={<BlogView />} />
      </Routes>
    </Router>
  )
}

/*
  <BlogList />
  <hr></hr>
  <Togglable buttonLabel='new blog'>
    <AddNewBlogForm />
  </Togglable>
*/

export default App

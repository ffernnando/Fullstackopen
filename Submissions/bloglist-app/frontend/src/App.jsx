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
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import UserView from './views/UserView'
import UserListView from './views/UserListView'
import BlogView from './views/BlogView'
import BlogListView from './views/BlogListView'
import { useMatch } from 'react-router-dom'
import UserListContext from './UserListContex'
import BlogContext from './BlogContext'
import NavBar from './components/NavBar'

const App = () => {
  const queryClient = useQueryClient()
  const [user, getUser, userLogin , userLogout] = useContext(UserContext)

  const [notification, ,] = useContext(NotificationContext)
  const UserList = useContext(UserListContext)

  const [Blogs] = useContext(BlogContext)

  useEffect(() => {
    getUser()
  }, [])

  const matchUserId = useMatch('/users/:id')
  const selectedUser = matchUserId
    ? UserList.data.find(
        (u) => u.id.toString() === String(matchUserId.params.id)
      )
    : null

  const matchBlogId = useMatch('/blogs/:id')
  const selectedBlog = matchBlogId
    ? Blogs.find((b) => b.id === String(matchBlogId.params.id))
    : null

  return (
    <div>
      <NavBar /> 
      <Notification notification={notification} />
      <h2 text-decoration="none"><Link to='/'>blog app</Link></h2>
      {
      !user 
        ? '' 
        : 
        <div>
          <Routes>
            <Route path='/' element={<BlogListView />} />
            <Route path='/users' element={<UserListView />} />
            <Route path='/users/:id' element={<UserView user={selectedUser} />} />
            
            <Route path='/blogs/:id' element={<BlogView blog={selectedBlog} />} />
          </Routes>
        </div> 
      }
      
    </div>
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

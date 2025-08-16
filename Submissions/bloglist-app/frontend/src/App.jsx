import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import AddNewBlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const notifRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      setBlogs(await blogService.getAll())
    }
    fetchBlogs()
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
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

  const showNotification = (message) => {
    notifRef.current.showMessage(message)
    setTimeout(() => {
      notifRef.current.showMessage(null)
    }, 5000)
  }

  const createBlog = async (title, author, url) => {
    try{
      const newBlog = { title: title, author: author, url: url }
      const createdBlog = await blogService.createNew(newBlog)
      setBlogs(blogs.concat(createdBlog))
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      console.log(exception)
      showNotification('error creating a new blog')
    }
  }
  return (
    <div>
      <Notification ref={notifRef}/>
      { user === null
        ? <div>
            <Togglable buttonLabel="login">
              <LoginForm setUser={setUser} showNotification={showNotification} />
            </Togglable>
          </div>
        : <div>
            <h2>blogs</h2>
            <p>{ user.name } logged in <button onClick={ handleLogout }>logout</button></p>
            <BlogList blogs={blogs} setBlogs={setBlogs}/>
            
            <hr></hr>
            <Togglable buttonLabel="new note">
              <AddNewBlogForm createBlog={createBlog}/>
            </Togglable>
          </div>
       }
    </div>
  )
}

export default App
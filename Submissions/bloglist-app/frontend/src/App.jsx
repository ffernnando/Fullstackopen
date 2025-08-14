import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({ setUser, showNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const result = await loginService.login(username, password)
      console.log("RESULT DATA: ", result)
      
      blogService.setToken(result.token)
      setUser(result)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(result))
      showNotification('successfully logged in')
    } catch (exception){
      showNotification('error logging in')
    }
   
  }

  return(
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <p>username <input type='text' value={username} name='Username' onChange={ ({ target }) => setUsername(target.value) }/></p>
      <p>password <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}/></p>
      <button type='submit'>login</button>
    </form>
  )
}


const CreateNewForm = ({ blogs, setBlogs, showNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateNew = (event) => {
    event.preventDefault()
    try{
      const newBlog = { title: title, author: author, url: url }
      blogService.createNew(newBlog)
      setBlogs(blogs.concat(newBlog))
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception)
      showNotification('error creating a new blog')
    }
    
  }

  return(
    <form onSubmit={handleCreateNew}>
      <div>title: <input type='text' name='Title' value={title} onChange={({target}) => setTitle(target.value)}/></div>
      <div>author: <input type='text' name='Author' value={author} onChange={({target}) => setAuthor(target.value)}/></div>
      <div>url: <input type='text' name='Url' value={url} onChange={({target}) => setUrl(target.value)}/></div>
      <button>create</button>
    </form>
  )
  
}

const Notification = ({ notification }) => {
  const notifStyle = {
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    };
  if(!notification) return null

  return(
    <div style={notifStyle}>
      {notification}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')


  useEffect(async () => {
    setBlogs(await blogService.getAll())
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
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <Notification notification={notification}/>
      { user === null 
        ? <div> <LoginForm setUser={setUser} showNotification={showNotification} />  </div>
        : <div>
            <h2>blogs</h2>
            <p>{ user.name } logged in <button onClick={ handleLogout }>logout</button></p>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            <CreateNewForm blogs={blogs} setBlogs={setBlogs} showNotification={showNotification} /> 
          </div>
       }
    </div>
  )
}

export default App
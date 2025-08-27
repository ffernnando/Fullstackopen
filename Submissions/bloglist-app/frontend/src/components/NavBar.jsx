import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../UserContext'
import Togglable from './Togglable'
import LoginForm from './LoginForm'

const NavBar = () => {
  const [user, getUser, , userLogout] = useContext(UserContext)
  const linkStyle = {
    paddingLeft: 5,
    paddingRight: 5,
  }
  const containerStyle = {
    display: 'flex',
    padding: 10,
    background: 'gray',
  }
  return (
    <div style={containerStyle}>
      <Link style={linkStyle} to={'/'}>
        blogs
      </Link>
      <Link style={linkStyle} to={'/users'}>
        users
      </Link>
      {user === null ? (
        <div>
          <Togglable buttonLabel='login'>
            <LoginForm />
          </Togglable>
        </div>
      ) : (
        <div>
          {user.name} logged in <button onClick={userLogout}>logout</button>
        </div>
      )}
    </div>
  )
}

export default NavBar

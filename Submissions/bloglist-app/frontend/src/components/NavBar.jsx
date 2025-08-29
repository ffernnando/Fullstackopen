import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../UserContext'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import {
  Form,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  InputGroup,
} from 'react-bootstrap'

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
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            Bloglist-app
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link>
              <Link to={'/'}>Blogs</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/users'}>Users</Link>
            </Nav.Link>
          </Nav>
          <Nav className='justify-contend-end'>
            {user === null ? (
              <Togglable buttonLabel='login'>
                <LoginForm />
              </Togglable>
            ) : (
              <Navbar.Text>
                {user.name} logged in{' '}
                <Button onClick={userLogout}>logout</Button>
              </Navbar.Text>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
/*
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
    */
export default NavBar

import { useContext, useState } from 'react'
import UserContext from '../UserContext'
import {
  Form,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  InputGroup,
  Row,
  Col,
} from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [, , userLogin] = useContext(UserContext)

  const handleLogin = async (event) => {
    event.preventDefault()
    userLogin(username, password)
    setUsername('')
    setPassword('')
  }
  const divStyle = { display: 'flex' }

  return (
    <div>
      <Form inline onSubmit={handleLogin} style={divStyle}>
        <Row>
          <Col xs='auto'>
            <InputGroup>
              <InputGroup.Text id='basic-addon1'>Username: </InputGroup.Text>
              <Form.Control
                placeholder='Username'
                aria-label='Username'
                aria-describedby='basic-addon1'
                data-testid='username'
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
              <InputGroup.Text id='basic-addon1'>Password: </InputGroup.Text>
              <Form.Control
                placeholder='Some password'
                aria-label='Password'
                aria-describedby='basic-addon1'
                data-testid='password'
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs='auto'>
            <Button variant='primary' type='submit' style={{marginRight: '1em'}}>
              login
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
/*
  <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username: </Form.Label>
          <Form.Control
            data-testid='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password: </Form.Label>
          <Form.Control
            data-testid='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>

*/

export default LoginForm

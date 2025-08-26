import { useContext, useState } from 'react'
import UserContext from '../UserContext'

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

  return (
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <p>
        username{' '}
        <input
          data-testid='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </p>
      <p>
        password{' '}
        <input
          data-testid='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </p>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm

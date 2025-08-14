import axios from 'axios';
const baseRoute = '/api/login'

const login = async (username, password) => {
  const loginInfo = { username: username, password: password }
  const result = await axios.post(baseRoute, loginInfo)
  console.log("WE POSTIN'")
  console.log(result.data)
  return result.data
}

export default { login }
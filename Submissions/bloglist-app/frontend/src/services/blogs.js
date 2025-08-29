import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (blog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blog, config)
  console.log(response.data)
  return response.data
}

const changeLikes = async (blog) => {
  const config = { headers: { Authorization: token } }
  blog.likes += 1
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const deleteOne = async (blog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const getCommentList = async (blog) => {
  console.log('BLOGĆINA ID: ', blog.id)
  const response = await axios.get(`${baseUrl}/${blog.id}/comments`)
  console.log('getCommentList: ', response.data)
  return response.data
}

const createComment = async ({blog, content}) => {
  //console.log('BLOG WITHIN SERVICE: ', blog)
  //console.log('CONTENT WITHIN SERVICE: ', content)
  //console.log('path: ', `${baseUrl}/${blog.id}/comments` )
  const config = { headers: { Authorization: token } }
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, {blog, content}, config)
  console.log('REZPONZ-DATA: ', response)
  return response.data.comment
}

export default { getAll, setToken, createNew, getOne, changeLikes, deleteOne, createComment, getCommentList }

import Blog from './Blog'
import BlogContext from '../BlogContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const [Blogs, , , , isLoading, isError] = useContext(BlogContext)
  console.log('Blogs: ', Blogs)
  if (isLoading) {
    return <div>Loading blogs...</div>
  }

  if (isError) {
    return <div>Error loading blogs...</div>
  }
  const sorted = [...Blogs].sort((a, b) => b.likes - a.likes)
  return (
    <Table striped>
      <tbody>
        {sorted.map((blog) => (
          //The to='...' path will need change when adding navbar so that the path will be relative to the blogs component etc. etc.
          <tr key={blog?.id}>
            <td>
              <Link to={`/blogs/${blog?.id}`}>{blog?.title}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
//<Blog key={blog.id} blog={blog} />
export default BlogList

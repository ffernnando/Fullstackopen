import Blog from './Blog'
import BlogContext from '../BlogContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

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
    <div>
      {sorted.map((blog) => (
        //The to='...' path will need change when adding navbar so that the path will be relative to the blogs component etc. etc.
        <Link to={`/blogs/${blog.id}`}>
          <div style={blogStyle}>{blog.title}</div>
        </Link>
      ))}
    </div>
  )
}
//<Blog key={blog.id} blog={blog} />
export default BlogList

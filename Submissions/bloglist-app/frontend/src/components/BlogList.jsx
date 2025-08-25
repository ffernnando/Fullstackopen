import Blog from './Blog'
import BlogContext from '../BlogContext'
import { useContext } from 'react'

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
    <div>
      {sorted.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList

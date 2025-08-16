import Blog from "./Blog"
import blogService from "../services/blogs"

const BlogList = ({ blogs, setBlogs }) => {
  const sorted = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      { sorted.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          blogs={blogs}
          blogService={blogService}
        />
      ))}
    </div>
  )
}

export default BlogList

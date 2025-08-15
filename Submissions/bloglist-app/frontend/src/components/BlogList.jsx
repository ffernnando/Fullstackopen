import Blog from "./Blog"

const BlogList = ({ blogs, setBlogs }) => {
  const temp = blogs
  temp.sort(function(a, b){ return b.likes - a.likes })
  
  return (
    <div>
      { temp.map(blog => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={temp}/>) }
    </div>
  )
}

export default BlogList
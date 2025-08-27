import BlogList from '../components/BlogList'
import Togglable from '../components/Togglable'
import AddNewBlogForm from '../components/BlogForm'

const BlogListView = () => {
  return (
    <div>
      <h2>blogs</h2>
      <BlogList />
      <hr />
      <Togglable buttonLabel='new blog'>
        <AddNewBlogForm />
      </Togglable>
    </div>
  )
}

export default BlogListView

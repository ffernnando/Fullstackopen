import BlogList from '../components/BlogList'
import Togglable from '../components/Togglable'
import AddNewBlogForm from '../components/BlogForm'

const BlogView = () => {
  

  return (
    <div>
      <BlogList />
      <hr />
      <Togglable buttonLabel='new blog'>
        <AddNewBlogForm />
      </Togglable>
    </div>
  )
}

export default BlogView

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect } from 'react'
import blogService from './services/blogs'
import NotificationContext from './NotificationContext'

const BlogContext = createContext()

export const BlogContextProvider = (props) => {
  const queryClient = useQueryClient()
  const [, , showNotification] = useContext(NotificationContext)

  const fetchBlogs = async () => {
    const response = await blogService.getAll()
    console.log('response: ', response)
    return response
  }

  const {
    data: Blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  })

  const createBlog = async (title, author, url) => {
    try {
      const newBlog = { title: title, author: author, url: url }
      const createdBlog = await blogService.createNew(newBlog)
      //setBlogs(Blogs.blogs.concat(createdBlog))
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      console.log(exception)
      showNotification('error creating a new blog')
    }
  }

  const deleteBlog = async (blog) => {
    try {
      const response = await blogService.deleteOne(blog)
      showNotification(`blog ${blog.title} by ${blog.author} deleted`)
      return blog
    } catch (exception) {
      console.log(exception)
      showNotification('error deleting a blog')
    }
  }

  const likeBlog = async (blog) => {
    try {
      const response = await blogService.changeLikes(blog)
      showNotification(`blog ${blog.title} by ${blog.author} liked`)
      return response
    } catch (exception) {
      console.log(exception)
      showNotification('error liking a blog')
    }
  }

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) => {
        return [...oldBlogs, newBlog]
      })
    },
  })

  const likeBlogMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: (likedBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) => {
        const filteredBlogs = oldBlogs.filter((b) => b.id !== likedBlog.id)
        console.log('Newly filtered list: ', [...filteredBlogs, likedBlog])
        return [...filteredBlogs, likedBlog]
      })
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (deletedBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) => {
        return oldBlogs.filter((b) => b.id !== deletedBlog.id)
      })
    },
  })

  return (
    <BlogContext.Provider
      value={[
        Blogs,
        newBlogMutation,
        likeBlogMutation,
        deleteBlogMutation,
        isLoading,
        isError,
      ]}
    >
      {props.children}
    </BlogContext.Provider>
  )
}

export default BlogContext

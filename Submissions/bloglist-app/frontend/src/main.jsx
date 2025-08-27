import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationProvider } from './NotificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlogContextProvider } from './BlogContext'
import { UserContextProvider } from './UserContext'
import { UserListContextProvider } from './UserListContex'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <UserContextProvider>
        <UserListContextProvider>
          <BlogContextProvider>
            <Router>
              <App />
            </Router>
          </BlogContextProvider>
        </UserListContextProvider>
      </UserContextProvider>
    </NotificationProvider>
  </QueryClientProvider>
)

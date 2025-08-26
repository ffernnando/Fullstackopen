import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationProvider } from './NotificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlogContextProvider } from './BlogContext'
import { UserContextProvider } from './UserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <UserContextProvider>
        <BlogContextProvider>
          <App />
        </BlogContextProvider>
      </UserContextProvider>
    </NotificationProvider>
  </QueryClientProvider>
)

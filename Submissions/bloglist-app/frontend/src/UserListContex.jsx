import { useContext, createContext } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import userService from './services/users'

const UserListContext = createContext()

export const UserListContextProvider = (props) => {
  const queryClient = useQueryClient()

  const getUserList = async () => {
    const res = await userService.getAllUsers()
    return res
  }

  const UserList = useQuery({
    queryKey: ['users'],
    queryFn: getUserList,
  })

  return (
    <UserListContext.Provider value={UserList}>
      {props.children}
    </UserListContext.Provider>
  )
}

export default UserListContext

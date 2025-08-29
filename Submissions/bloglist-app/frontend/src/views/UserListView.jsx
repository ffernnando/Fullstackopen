import UserContext from '../UserContext'
import { useContext, useEffect, useState } from 'react'
import userService from '../services/users'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useMatch } from 'react-router-dom'
import UserListContext from '../UserListContex'
import { Table } from 'react-bootstrap'

const UserListView = () => {
  //const [user, getUser, userLogin, userLogout] = useContext(UserContext)
  /*
    ------------------------- ADD USER LIST STATE HANDLING VIA TANSTACK/REACT QUERY + CONTEXT --------------------------------
    ----------- ALSO ADD A FEATURE THAT, WHEN YOU DELETE A BLOG, YOU ALSO DELETE IT FROM EVERY USER'S LIST OF BLOGS ----------
    --------------------------------------------- SOLVED !!!!!!!!!!!!!!!!!!!!!!!!!! ------------------------------------------
    */

  /*
    const match = useMatch('/users/:id')
    const user = match
      ? userList.find((u) => u.id === Number(match.params.id))
      : null

    const getUserList = async () => {
      const res = await userService.getAllUsers()
      return res
    }
    const queryClient = useQueryClient() 
    const {
      data: userList,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ['users'],
      queryFn: getUserList,
    }) 
  */

  const UserList = useContext(UserListContext)

  if (UserList.isLoading) {
    return <div>Loading users...</div>
  }
  if (UserList.isError) {
    return <div>Error loading users :(</div>
  }

  console.log('UserList.data: ', UserList.data)

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {UserList.data.map((u) => (
            <tr key={u.key}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
        
      </Table>
    </div>
  )
}

export default UserListView

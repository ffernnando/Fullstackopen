import UserContext from '../UserContext'
import { useContext, useEffect, useState } from 'react'
import userService from '../services/users'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const UserListView = () => {
  const [user, getUser, userLogin, userLogout] = useContext(UserContext)
  /*
    ------------------------- ADD USER LIST STATE HANDLING VIA TANSTACK/REACT QUERY + CONTEXT --------------------------------
    ----------- ALSO ADD A FEATURE THAT, WHEN YOU DELETE A BLOG, YOU ALSO DELETE IT FROM EVERY USER'S LIST OF BLOGS ----------
    --------------------------------------------- SOLVED !!!!!!!!!!!!!!!!!!!!!!!!!! ------------------------------------------
    */

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

  if (isLoading) {
    return <div>Loading users...</div>
  }
  if (isError) {
    return <div>Error loading users :(</div>
  }
  console.log('userList: ', userList)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <td></td>
          <td>
            <b>blogs created</b>
          </td>
        </tr>
        {userList.map((u) => (
          <tr key={u.key}>
            <td><Link to={`users/${u.id}`}>{u.name}</Link></td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default UserListView

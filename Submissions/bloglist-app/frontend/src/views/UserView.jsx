import { ListGroup } from 'react-bootstrap'
const UserView = ({ user }) => {
  // Add everything related to displaying details of a user - his blogs: use the match method thing to get the user's id
  // from the URL and then search the database via User.findById(...) or change the userRouter so that it populates the
  // user object with adequate blogs made by that user - simple enough with the .get('users/:id')
  console.log('user: ', user)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs.map((b) => (
          <ListGroup.Item>{b.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}
export default UserView

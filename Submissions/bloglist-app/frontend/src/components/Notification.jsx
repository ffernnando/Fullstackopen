import { Alert } from 'react-bootstrap'
const Notification = ({ notification }) => {
  console.log('Notification: ', notification)

  const variant = notification?.toLowerCase().includes('error')
    ? 'danger'
    : 'info'
  console.log('variant: ', variant)

  const notifStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
  if (!notification) return null

  return <Alert variant={variant}> {notification} </Alert>
}

export default Notification

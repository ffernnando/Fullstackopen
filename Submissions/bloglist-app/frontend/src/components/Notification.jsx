const Notification = ({notification}) => {
  console.log('Notification: ', notification)
  const notifStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
  if (!notification) return null

  return <div style={notifStyle}>{notification}</div>
}

export default Notification

import { useReducer, createContext, useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const notifContext = useContext(NotificationContext)
  const content = notifContext.notification

  let style = {}
  content !== '' ? style = { border: 'solid', padding: 10, borderWidth: 1, marginBottom: 5 } : style = { display: 'none' }

  return (
    <div style={style}>
      {content}
    </div>
  )
}

export default Notification

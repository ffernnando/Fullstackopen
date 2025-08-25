/* eslint-disable indent */
import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      console.log('Action payload: ', action.payload)
      return action.payload
    }
    case 'CLEAR_NOTIFICATION': {
      console.log('CLEARING notification')
      return ''
    }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  const showNotification = (message) => {
    console.log('message: ', message)
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: message })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <NotificationContext.Provider
      value={[notification, notificationDispatch, showNotification]}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

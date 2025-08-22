import { useReducer, createContext, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIF': {
      return action.payload
    }
    case 'CLEAR_NOTIF': {
      return ''
    }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const setNotif = (content) => {
  return {
    type: 'SET_NOTIF',
    payload: content
  }
}
export const clearNotif = () => {
  return {
    type: 'CLEAR_NOTIF'
  }
}

export const showNotification = (dispatch, content) => {
  dispatch(setNotif(content))
  setTimeout(() => {
    dispatch(clearNotif(content))
  }, 5000)
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return(
    <NotificationContext.Provider value={{notification, notificationDispatch}}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
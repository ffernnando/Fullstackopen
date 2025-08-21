import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationText(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch(setNotificationText(content))
    setTimeout(() => { 
      dispatch(removeNotification())
    }, duration * 1000)
  }
}

export const { setNotificationText, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
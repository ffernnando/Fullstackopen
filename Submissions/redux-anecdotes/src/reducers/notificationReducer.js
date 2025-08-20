import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, actions) {
      return `you voted '${actions.payload}'`
    },
    removeNotification(state, actions) {
      return ''
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
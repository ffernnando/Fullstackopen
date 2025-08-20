import { createSlice } from '@reduxjs/toolkit'

const filterSlice  = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, actions) {
      const content = actions.payload
      return content
    }
  }
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer
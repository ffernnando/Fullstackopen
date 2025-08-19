import React from 'react'
import { toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'
import NewNote from './components/newNote'
import Notes from './components/Notes'

const App = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}

export default App
import { useContext } from 'react'
import { useCounterDispatch } from '../src/CounterContext'

export const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch()
  return(
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}
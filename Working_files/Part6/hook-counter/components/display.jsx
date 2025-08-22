import { useContext } from 'react'
import { useCounterValue } from '../src/CounterContext'

export const Display = () => {
  const counter = useCounterValue()
  return <div>{ counter }</div>
}
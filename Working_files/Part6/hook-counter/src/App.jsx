import { useContext } from 'react'
import { Display } from '../components/display'
import { Button } from '../components/button'

const App = () => {
  return (
    <div>
      <Display counter={counter} />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </div>
  )
}

export default App
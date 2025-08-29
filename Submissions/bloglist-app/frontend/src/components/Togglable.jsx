import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? 'flex' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={() => setVisible(!visible)}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={() => setVisible(!visible)}>cancel</Button>
      </div>
    </div>
  )
}

Togglable.displayName = 'Togglable'
Togglable.PropTypes = { buttonLabel: PropTypes.string.isRequired }
export default Togglable

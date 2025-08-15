import { useState, forwardRef, useImperativeHandle } from "react";

const Notification = forwardRef((props, ref) => {

  const [notificationMessage, setNotification] = useState('')
  useImperativeHandle(ref, () => ({
    showMessage: (message) => setNotification(message)
  }))

  const notifStyle = {
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    };
  if(!notificationMessage) return null

  return(
    <div style={notifStyle}>
      {notificationMessage}
    </div>
  )
})

export default Notification
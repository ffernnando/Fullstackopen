const Notification = ({content}) => {
  let style = {}
  content !== '' ? style = { display: '' } : style = { display: 'none' }
  console.log('Content: ', content)
  return (
    <div style={style}>{content}</div>
  )
}
export default Notification
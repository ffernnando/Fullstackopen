
interface NotificationParams {
  notificationMessage: string | undefined;
};

const Notification = (props: NotificationParams) => {
  const notifStyle = props.notificationMessage?.toLowerCase().includes('error') ? { color: 'red' } : { color: 'black' };

  return (
    <p style={notifStyle}>{props.notificationMessage}</p>
  );
};

export default Notification;
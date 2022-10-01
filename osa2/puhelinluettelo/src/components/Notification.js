const Notification = ({ message, type = 'Success' }) => (
  <div className={`Notification${type}`}>{message}</div>
)

export default Notification

const { SEND_NOTIFICATION_EVENT } = require('../../const/socketConstant')
const NotificationHandler = require('../../controllers/socket/NotificationHandlers')

exports.ChatEvent = (io, socket) => {
  socket.on(SEND_NOTIFICATION_EVENT, (data) =>
    NotificationHandler.SendNotification(
      io,
      socket,
      SEND_NOTIFICATION_EVENT,
      data
    )
  )
}

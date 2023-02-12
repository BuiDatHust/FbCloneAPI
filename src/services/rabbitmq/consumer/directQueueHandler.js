const {
  NOTIFICATION_QUEUE
} = require('../../../const/messageQueueConstant')
const { notificationHandler } = require('./notificationQueueHandler')

exports.directQueueHandler = async (message, queueName) => {
  switch (queueName) {
    case NOTIFICATION_QUEUE:
      return notificationHandler(message)
    default:
      return
  }
}

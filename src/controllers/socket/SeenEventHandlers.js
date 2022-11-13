const {
  SOCKET_ERROR_EVENT,
  SOCKET_REDIS_PREIX,
} = require('../../const/socketConstant')
const { redisClient } = require('../../initializers/redis')
const { socketResponse } = require('../../libs/response')
const { socketEventLogging } = require('../../libs/socketEventLoggers')
const MessageServices = require('../../services/MessageServices')

const SeenMessage = async (io, socket, eventName, data) => {
  socketEventLogging(io, socket, eventName, data)
  try {
    const { messageId, message_from, seen_at } = data
    const currentSocketIds = await redisClient.lRange(
      `${SOCKET_REDIS_PREIX}${message_from}`,
      0,
      -1
    )
    await MessageServices.updateMessageById(messageId, {
      sent_at,
    })
    if (currentSocketIds.length)
      socketResponse(
        io,
        null,
        [...currentSocketIds, socket.id],
        eventName,
        { seen_at }
      )
  } catch (error) {
    console.log(error)
    socketResponse(io, null, [socket.id], SOCKET_ERROR_EVENT, error.message)
  }
}

module.exports = { SeenMessage }

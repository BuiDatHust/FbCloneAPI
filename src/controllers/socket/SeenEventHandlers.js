const {
  SOCKET_ERROR_EVENT,
  SOCKET_REDIS_PREIX,
  SEEN_MESSAGE_RESPONSE_EVENT,
} = require('../../const/socketConstant')
const { redisClient } = require('../../initializers/redis')
const { socketResponse } = require('../../libs/response')
const { socketEventLogging } = require('../../libs/socketEventLoggers')
const MessageServices = require('../../services/MessageServices')

const SeenMessage = async (io, socket, eventName, data) => {
  socketEventLogging(io, socket, eventName, data)
  try {
    const { messageId, message_to, seen_at } = data
    const currentSocketIds = await redisClient.lRange(
      `${SOCKET_REDIS_PREIX}${message_to}`,
      0,
      -1
    )
    await MessageServices.updateMessageById(messageId, {
      seen_at,
    })
    if (currentSocketIds.length)
      await socketResponse(io, null, [...currentSocketIds, socket.id], SEEN_MESSAGE_RESPONSE_EVENT, {
        messageId,
        seen_at,
      })
  } catch (error) {
    console.log(error)
    await socketResponse(io, null, [socket.id], SOCKET_ERROR_EVENT, error.message)
  }
}

module.exports = { SeenMessage }

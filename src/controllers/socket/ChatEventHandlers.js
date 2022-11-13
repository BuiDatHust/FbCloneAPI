const {
  SEND_MESSAGE_EVENT,
  SOCKET_ERROR_EVENT,
  SOCKET_REDIS_PREIX,
} = require('../../const/socketConstant')
const { redisClient } = require('../../initializers/redis')
const { socketResponse } = require('../../libs/response')
const { socketEventLogging } = require('../../libs/socketEventLoggers')
const MessageServices = require('../../services/MessageServices')
const FriendServices = require('../../services/FriendServices')
const ChatServices = require('../../services/ChatServices')

const SendMessage = async (io, socket, eventName, data) => {
  socketEventLogging(io, socket, eventName, data)
  try {
    const message_from = socket.request.currentUser._id
    const message_to = data.userId
    const { chatId, type, content } = data
    const currentSocketIds = await redisClient.lRange(
      `${SOCKET_REDIS_PREIX}${message_from}`,
      0,
      -1
    )
    const messageAttr = {
      chatId,
      message_from,
      message_to,
      type,
      content,
    }
    const friend = await FriendServices.findOneFriend(message_from, message_to)
    if (!friend)
      await ChatServices.createChat({
        firstUserId: message_from,
        secondUserId: message_to,
        isPending: true,
      })
    const message = await MessageServices.createMessage(messageAttr)
    if (currentSocketIds.length)
      socketResponse(
        io,
        null,
        [...currentSocketIds, socket.id],
        SEND_MESSAGE_EVENT,
        message
      )
  } catch (error) {
    console.log(error)
    socketResponse(io, null, [socket.id], SOCKET_ERROR_EVENT, error.message)
  }
}

module.exports = { SendMessage }

const {
  SOCKET_ERROR_EVENT,
  SOCKET_REDIS_PREIX,
  RECIEVE_MESSAGE_EVENT,
  SEND_NOTIFICATION_EVENT,
} = require('../../const/socketConstant')
const { redisClient } = require('../../initializers/redis')
const { socketResponse } = require('../../libs/response')
const { socketEventLogging } = require('../../libs/socketEventLoggers')
const MessageServices = require('../../services/MessageServices')
const FriendServices = require('../../services/FriendServices')
const ChatServices = require('../../services/ChatServices')

const SendNotification = async (io, socket, eventName, data) => {
  socketEventLogging(io, socket, eventName, data)
  try {
    const message_from = socket.request.currentUser._id
    const message_to = data.userId
    const { chat_id, type, content, createdDate } = data
    const currentSocketIds = await redisClient.lRange(
      `${SOCKET_REDIS_PREIX}${message_to}`,
      0,
      -1
    )
    const messageAttr = {
      chat_id,
      message_from,
      message_to,
      type,
      content,
      createdDate
    }
    const friend = await FriendServices.findOneFriend(message_from, message_to)
    if (!friend)
      await ChatServices.createChat({
        chat_id,
        firstUserId: message_from,
        secondUserId: message_to,
        isPending: true,
      })
    const message = await MessageServices.createMessage(messageAttr)
    if (currentSocketIds.length)
      await socketResponse(
        io,
        null,
        [...currentSocketIds, socket.id],
        SEND_NOTIFICATION_EVENT,
        message
      )
  } catch (error) {
    console.log(error)
    await socketResponse(
      io,
      null,
      [socket.id],
      SOCKET_ERROR_EVENT,
      error.message
    )
  }
}

module.exports = { SendNotification }

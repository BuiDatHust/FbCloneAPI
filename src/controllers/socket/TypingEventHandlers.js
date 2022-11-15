const {
  SOCKET_ERROR_EVENT,
  SOCKET_REDIS_PREIX,
  DISPLAY_TYPING_EVENT,
} = require('../../const/socketConstant')
const { redisClient } = require('../../initializers/redis')
const { socketResponse } = require('../../libs/response')
const { socketEventLogging } = require('../../libs/socketEventLoggers')

const TypingEvent = async (io, socket, eventName, data) => {
  socketEventLogging(io, socket, eventName, data)
  try {
    const {message_from, typing} = data;
    if(typing){
        const currentSocketIds = await redisClient.lRange(
            `${SOCKET_REDIS_PREIX}${message_from}`,
            0,
            -1
        )
        if(currentSocketIds.length) await socketResponse(io, null, currentSocketIds, DISPLAY_TYPING_EVENT, data)
    }
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

module.exports = { TypingEvent }

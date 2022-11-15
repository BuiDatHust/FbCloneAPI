const {
  SOCKET_ERROR_EVENT,
  SOCKET_REDIS_PREIX,
  ONLINE_EVENT,
  OFFLINE_EVENT,
} = require('../../const/socketConstant')
const { redisClient } = require('../../initializers/redis')
const { socketResponse } = require('../../libs/response')
const { socketEventLogging } = require('../../libs/socketEventLoggers')
const FriendServices = require('../../services/FriendServices')
const UserServices = require('../../services/UserServices')

const OnlineEvent = async (io, socket, eventName, data) => {
  socketEventLogging(io, socket, eventName, data)
  try {
    const userId = socket.request.currentUser._id
    const socketIds = await getFriendSockets(userId)
    await UserServices.updateUser(userId, { is_online: true })
    await socketResponse(io, null, socketIds, ONLINE_EVENT, { userId })
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

const OfflineEvent = async (io, socket, eventName, data) => {
  socketEventLogging(io, socket, eventName, data)
  try {
    const { last_active_at } = data
    const userId = socket.request.currentUser._id
    const socketIds = await getFriendSockets(userId)
    await UserServices.updateUser(userId, { is_online: false, last_active_at })
    await socketResponse(io, null, socketIds, OFFLINE_EVENT, {
      userId,
      last_active_at,
    })
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

const getFriendSockets = async (userId) => {
  const socketIds = []
  const friends = await FriendServices.findListFriend(userId)
  for (const friend of friends) {
    const currentSocketIds = await redisClient.lRange(
      `${SOCKET_REDIS_PREIX}${friend._id}`,
      0,
      -1
    )
    if (currentSocketIds.length) socketIds.push(...currentSocketIds)
  }
  return socketIds
}

module.exports = { OnlineEvent, OfflineEvent }

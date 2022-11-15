const jwt = require('jsonwebtoken')
const settings = require('../configs/settings')
const { SOCKET_REDIS_PREIX } = require('../const/socketConstant')
const { redisClient } = require('../initializers/redis')
const { Unauthorized } = require('../libs/errors')
const UserServices = require('../services/UserServices')

exports.authenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token
    const payload = jwt.verify(token, settings.jwt.secret, {
      algorithms: ['HS256'],
    })
    const user = await UserServices.findOne({ _id: payload.id })
    if (!user) return next(new Error(Unauthorized.message))
    const currentUserTokens = await redisClient.lRange(
      `${SOCKET_REDIS_PREIX}${payload.id}`,
      0,
      -1
    )
    console.log(currentUserTokens)
    socket.request.currentUser = user
    socket.request.deviceId = payload.deviceId
    next()
  } catch (error) {
    console.log(error)
    next(new Error(error.message))
  }
}

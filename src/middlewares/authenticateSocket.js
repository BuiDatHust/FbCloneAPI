const jwt = require('jsonwebtoken')
const settings = require('../configs/settings')
const { WHITELIST_ACCESS_TOKEN_PATTERN } = require('../const/userConstant')
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
      `${WHITELIST_ACCESS_TOKEN_PATTERN}${user._id}_${payload.deviceId}`,
      0,
      -1
    )
    console.log(currentUserTokens)
    const validToken = currentUserTokens.find((currentToken) => {
      const jsonToken = JSON.parse(currentToken)
      return jsonToken.token === token
    })
    if (!validToken) return next(new Error(Unauthorized.message))
    socket.request.currentUser = user
    socket.request.deviceId = payload.deviceId
    next()
  } catch (error) {
    console.log(error)
    next(new Error(error.message))
  }
}

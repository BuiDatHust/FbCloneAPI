const { redisClient } = require('../initializers/redis')
const settings = require('../configs/settings')
const { Passport } = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const UserServices = require('../services/UserServices')
const { WHITELIST_ACCESS_TOKEN_PATTERN } = require('../const/userConstant')

const passport = new Passport()

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: settings.jwt.secret,
  passReqToCallback: true,
  algorithms: ['HS256'],
}

const jwtStrategy = new Strategy(jwtOptions, async (req, payload, next) => {
  try {
    const user = await UserServices.findOneUser({ _id: payload.id })
    if (!user) return next(null, null)
    const currentUserTokens = await redisClient.lRange(
      `${WHITELIST_ACCESS_TOKEN_PATTERN}${user._id}_${payload.deviceId}`,
      0,
      -1
    )
    console.log(currentUserTokens)
    const validToken = currentUserTokens.find((token) => {
      const jsonToken = JSON.parse(token)
      return jsonToken.token === req.get('authorization').replace('Bearer ', '')
    })
    if (!validToken) return next(null, null)
    req.currentUser = user
    req.deviceId = payload.deviceId || '1111asaxaxn#ccd'
    if (user.device_ids.includes(req.deviceId)) {
      const device_ids = user.device_ids || []
      device_ids.push(deviceId)
      user.device_ids = device_ids
      await user.save()
    }
    next(null, user)
  } catch (error) {
    console.log(error)
    next(null, false)
  }
})

passport.use(jwtStrategy)

module.exports = passport

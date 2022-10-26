const mongoose = require('mongoose')
const settings = require('../configs/settings')
const { redisClient } = require('../initializers/redis')
const bcrypt = require('bcryptjs')
const dayjs = require('dayjs')
const { GENDER_MALE, GENDER_FEMALE, GENDER_SECRET } = require('../const/userConstant')

const usersSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: false,
      max: 30,
    },
    lastName: {
      type: String,
      required: false,
      max: 30,
    },
    gender: {
      type: String,
      enum: [GENDER_MALE, GENDER_FEMALE, GENDER_SECRET],
      required: false,
      default: GENDER_SECRET,
    },
    date_of_birth: {
      type: Date,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    cover_image: {
      type: String,
      required: false,
    },
    blocked_inbox: {
      type: Array,
      required: false,
    },
    blocked_diary: {
      type: Array,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

usersSchema.index({ phone: 'text' })
usersSchema.pre('save', async function (next) {
  const user = this
  const salt = await bcrypt.genSalt(settings.hashSalt)
  const hashedPassword = await bcrypt.hash(user.password, salt)
  if (!hashedPassword) {
    return next(err)
  }
  user.password = hashedPassword
  next()
})

usersSchema.statics.comparePassword = async (password, hashedPassword) => {
  const isEqual = await bcrypt.compare(password, hashedPassword)
  return isEqual
}

usersSchema.statics.generateAccessToken = async (id, deviceId) => {
  const token = jwt.sign({ id, deviceId }, settings.jwt.secret, {
    expiresIn: settings.jwt.ttl,
  })
  const currentUserTokens = await redisClient.lRange(
    `${UserRepository.WHITELIST_ACCESS_TOKEN_PATTERN}${payload.deviceId}_${id}`,
    0,
    -1
  )
  for (const token of currentUserTokens) {
    const jsonToken = JSON.parse(token)
    if (dayjs().unix() > jsonToken.expireAt)
      await redisClient.lRem(
        `${UserRepository.WHITELIST_ACCESS_TOKEN_PATTERN}${payload.deviceId}_${id}`,
        1,
        token
      )
  }
  await redisClient.rPush(
    `${UserRepository.WHITELIST_ACCESS_TOKEN_PATTERN}${payload.deviceId}_${user.id}`,
    JSON.stringify({
      token,
      expireAt: dayjs().add(Settings.jwt.ttl, 'seconds').unix(),
    })
  )
  return token
}

const UserModel = mongoose.model('Users', usersSchema)

module.exports = UserModel

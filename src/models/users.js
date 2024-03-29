const { default: mongoose, Schema } = require('mongoose')
const settings = require('../configs/settings')
const { redisClient } = require('../initializers/redis')
const bcrypt = require('bcryptjs')
const dayjs = require('dayjs')
const jwt = require('jsonwebtoken')
const {
  GENDER_MALE,
  GENDER_FEMALE,
  GENDER_SECRET,
  WHITELIST_ACCESS_TOKEN_PATTERN,
} = require('../const/userConstant')

const usersSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return settings.regex.phone.test(v)
        },
        message: (props) => `${props.value} khong phai so dien thoai hop le!`,
      },
    },
    countryCode: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return settings.regex.countryCode.test(v)
        },
        message: (props) => `${props.value} khong phai ma code hop le!`,
      },
    },
    email: {
      type: String,
      required: false,
      validate: {
        validator: function (v) {
          return settings.regex.email.test(v)
        },
        message: (props) => `${props.value} khong phai email hop le!`,
      },
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
      required: true,
      max: [30, 'Phai duoi 30 ky tu, co {VALUE} ky tu'],
    },
    lastName: {
      type: String,
      required: true,
      max: [30, 'Phai duoi 30 ky tu, co {VALUE} ky tu'],
    },
    gender: {
      type: String,
      enum: [GENDER_MALE, GENDER_FEMALE, GENDER_SECRET],
      required: false,
      default: GENDER_SECRET,
      message: 'gioi tinh {VALUE} khong ho tro',
    },
    date_of_birth: {
      type: Date,
      required: false,
    },
    description: {
      type: String,
      required: true,
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
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Users',
        },
      ],
      required: false,
    },
    blocked_diary: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Users',
        },
      ],
      required: false,
    },
    is_online: {
      type: Boolean,
      default: false,
    },
    last_active_at: {
      type: Date,
      default: Date.now,
    },
    device_ids: {
      type: [String],
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

usersSchema.query.byPaginate = function (pageNumber, nPerPage, sortCondition) {
  return this.sort(sortCondition)
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage)
}

usersSchema.statics.comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  return isMatch
}

usersSchema.statics.generateAccessToken = async (id, deviceId) => {
  const token = jwt.sign({ id, deviceId }, settings.jwt.secret, {
    expiresIn: settings.jwt.ttl,
  })
  const currentUserTokens = await redisClient.lRange(
    `${WHITELIST_ACCESS_TOKEN_PATTERN}${id}_${deviceId}`,
    0,
    -1
  )
  for (const token of currentUserTokens) {
    const jsonToken = JSON.parse(token)
    if (dayjs().unix() > jsonToken.expireAt)
      await redisClient.lRem(
        `${WHITELIST_ACCESS_TOKEN_PATTERN}${id}_${deviceId}`,
        1,
        token
      )
  }
  await redisClient.rPush(
    `${WHITELIST_ACCESS_TOKEN_PATTERN}${id}_${deviceId}`,
    JSON.stringify({
      token,
      expireAt: dayjs().add(settings.jwt.ttl, 'seconds').unix(),
    })
  )
  return token
}

usersSchema.statics.deleteToken = async (deviceId, id) => {
  const currentUserTokens = await redisClient.lRange(
    `${WHITELIST_ACCESS_TOKEN_PATTERN}${id}_${deviceId}`,
    0,
    -1
  )
  console.log(`${WHITELIST_ACCESS_TOKEN_PATTERN}${id}_${deviceId}`)
  let totalToken = currentUserTokens.length
  while (totalToken) {
    await redisClient.lPop(`${WHITELIST_ACCESS_TOKEN_PATTERN}${id}_${deviceId}`)
    totalToken -= 1
  }
  await this.findByIdAndUpdate(id, {
    $pullAll: {
      device_ids: deviceId,
    },
  })
}

usersSchema.statics.deleteAllToken = async (id) => {
  const whitelistKeys = await redisClient.keys(
    `${WHITELIST_ACCESS_TOKEN_PATTERN}${id}*`
  )
  for (const whitelist of whitelistKeys) {
    const currentUserTokens = await redisClient.lRange(whitelist, 0, -1)
    let totalToken = currentUserTokens.length
    while (totalToken) {
      await redisClient.lPop(whitelist)
      totalToken -= 1
    }
  }
  await this.findByIdAndUpdate(id, {
    $pullAll: {
      device_ids: [],
    },
  })
}

usersSchema.index(
  {
    username: 'text',
    firstName: 'text',
    lastName: 'text',
    description: 'text',
  },
  {
    weights: {
      username: 5,
      firstName: 4,
      lastName: 3,
      description: 2,
    },
  }
)

const UserModel = mongoose.model('Users', usersSchema)

module.exports = UserModel

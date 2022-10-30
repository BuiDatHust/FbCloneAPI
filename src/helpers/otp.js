const { OTP_SMS_PATTERN } = require('../const/userConstant')
const { redisClient } = require('../initializers/redis')

const generateOtpCode = async (userId) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let code = ''
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  const otp = await redisClient.get(`${OTP_SMS_PATTERN}${userId}`)
  if (otp && otp === code) {
    this.generateOtpCode()
  }
  return code
}

module.exports = generateOtpCode

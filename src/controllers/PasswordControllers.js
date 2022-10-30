const settings = require('../configs/settings')
const { OTP_SMS_PATTERN } = require('../const/userConstant')
const generateOtpCode = require('../helpers/otp')
const sendMessage = require('../helpers/sendSms')
const { redisClient } = require('../initializers/redis')
const { NoData, PasswordNotMatch, OtpNotCorrect } = require('../libs/errors')
const { sendError, sendSuccess } = require('../libs/response')
const UserServices = require('../services/UserServices')

exports.create = async (req, res) => {
  try {
    const { phone } = req.body
    const user = await UserServices.findOne({ phone })
    const userId = user._id.toString();
    if (!user) return sendError(res, 404, NoData)
    const otp = await generateOtpCode(userId)
    const smsText = `Ma OTP lay lai mat khau cua ban la: ${otp}, vui long khong cho ai biet ma nay. Ma se het han sau ${
      settings.otpTtl / 60
    } phut`
    const reciepentPhone = user.countryCode + phone
    await sendMessage(smsText, reciepentPhone)
    await redisClient.set(`${OTP_SMS_PATTERN}${userId}`, otp, settings.otpTtl)
    await redisClient.set(otp + userId, 0, settings.otpTtl)
    return sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.verifyCode = async (req, res) => {
  try {
    const { phone, code } = req.body
    const user = await UserServices.findOne({ phone })
    if (!user) return sendError(res, 404, NoData)
    const otp = await redisClient.get(`${OTP_SMS_PATTERN}${user._id}`)
    if (!otp) return sendError(res, 216, OtpNotCorrect)
    if(otp===code) await redisClient.set(otp + user._id, 1)
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.newPassword = async (req, res) => {
  try {
    const { phone, password, passwordConfirmation } = req.body
    const user = await UserServices.findOne({ phone })
    if (!user) return sendError(res, 404, NoData)
    const otp = await redisClient.get(`${OTP_SMS_PATTERN}${user._id}`)
    const isVerified = await redisClient.get(otp + user._id)
    if (!isVerified) return sendError(res, 216, OtpNotCorrect)
    if (password !== passwordConfirmation)
      return sendError(res, 400, PasswordNotMatch)
    user.password = password
    await user.save()
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

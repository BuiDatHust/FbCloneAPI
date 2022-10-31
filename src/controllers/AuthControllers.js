const settings = require('../configs/settings')
const {
  RegiteredPhone,
  PasswordNotMatch,
  NoData,
  PasswordNotCorrect,
  DeviceIdIsMissing,
} = require('../libs/errors')
const permitParameter = require('../libs/parameter')
const { sendError, sendSuccess } = require('../libs/response')
const UserModel = require('../models/users')
const UserServices = require('../services/UserServices')
const { CREATEBLE_PARAMETER } = require('../const/userConstant')

exports.signUp = async (req, res) => {
  try {
    const { phone, password, passwordConfirmation } = req.body
    const params = permitParameter(req.body, CREATEBLE_PARAMETER)
    const existedUser = await UserServices.findOne({ phone })
    if (existedUser) return sendError(res, 400, RegiteredPhone)
    if (password !== passwordConfirmation)
      return sendError(res, 400, PasswordNotMatch)
    await UserServices.createOne(params)
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.signIn = async (req, res) => {
  try {
    const { phone, password, deviceId } = req.body
    if (!deviceId) return sendError(res, 404, DeviceIdIsMissing)
    const existedUser = await UserServices.findOne({ phone })
    if (!existedUser) return sendError(res, 404, NoData)
    const isMatch = await UserModel.comparePassword(
      password,
      existedUser.password
    )
    if (!isMatch) return sendError(res, 400, PasswordNotCorrect)
    const accessToken = await UserModel.generateAccessToken(
      existedUser._id,
      deviceId
    )
    sendSuccess(res, { accessToken, tokenExpireAfter: settings.jwt.ttl })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.signOut = async (req, res) => {
  try {
    const user = req.currentUser
    const { deviceId } = req
    await UserModel.deleteToken(deviceId, user._id)
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.signOutAll = async (req, res) => {
  try {
    const user = req.currentUser
    await UserModel.deleteAllToken(user._id)
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

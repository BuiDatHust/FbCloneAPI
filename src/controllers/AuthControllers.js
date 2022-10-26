const {
  RegiteredPhone,
  PasswordNotMatch,
  NoData,
  PasswordNotCorrect,
} = require('../libs/errors')
const { sendError } = require('../libs/response')
const UserModel = require('../models/users')
const UserServices = require('../services/UserServices')

exports.signUp = async (req, res) => {
  try {
    const { phone, password, passwordConfirmation, deviceId } = req.body
    const existedUser = await UserServices.findOne({ phone })
    if (existedUser) return sendError(res, 400, RegiteredPhone)
    if (password !== passwordConfirmation)
      return sendError(res, 400, PasswordNotMatch)
    const user = await UserServices.createOne(req.body)
    const accessToken = await UserModel.generateAccessToken(user.id, deviceId)
    sendSuccess(res, { accessToken, tokenExpireAfter: settings.jwt.ttl })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.signIn = async (req, res) => {
  try {
    const { phone, password, deviceId } = req.body
    const existedUser = await UserServices.findOne({ phone })
    if (!existedUser) return sendError(res, 404, NoData)
    const isMatch = await UserModel.comparePassword(
      password,
      existedUser.password
    )
    if (!isMatch) return sendError(res, 400, PasswordNotCorrect)
    const accessToken = await UserModel.generateAccessToken(user.id, deviceId)
    sendSuccess(res, { accessToken, tokenExpireAfter: settings.jwt.ttl })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.signOut = async (req, res) => {
  try {
    const { user } = req.currentUser
    const { deviceId } = req.currentUser
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.signOutAll = async (req, res) => {}

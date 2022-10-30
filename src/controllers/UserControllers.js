const { UPDATEBLE_PARAMETER } = require('../const/userConstant')
const { NoData, PasswordNotMatch } = require('../libs/errors')
const permitParameter = require('../libs/parameter')
const { sendSuccess, sendError } = require('../libs/response')
const UserModel = require('../models/users')
const UserServices = require('../services/UserServices')

exports.show = async (req, res) => {
  const user = req.currentUser
  sendSuccess(res, { user })
}

exports.update = async (req, res) => {
  try {
    const params = permitParameter(req.body, UPDATEBLE_PARAMETER)
    const user = await UserServices.updateUser(req.currentuser._id, params)
    sendSuccess(res, { user })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, passwordConfirmation } = req.body
    const isMatch = await UserModel.comparePassword(oldPassword, req.currentUser.password)
    if (!isMatch || newPassword !== passwordConfirmation) return sendError(res, 404, PasswordNotMatch)
    user.password = newPassword
    await user.save()
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

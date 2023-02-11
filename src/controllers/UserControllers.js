const settings = require('../configs/settings')
const { UPDATEBLE_PARAMETER } = require('../const/userConstant')
const { NoData, PasswordNotMatch } = require('../libs/errors')
const permitParameter = require('../libs/parameter')
const { sendSuccess, sendError } = require('../libs/response')
const UserModel = require('../models/users')
const { findOneByFilter, findFriend } = require('../services/FriendServices')
const UserServices = require('../services/UserServices')

exports.show = async (req, res) => {
  const user = req.currentUser
  sendSuccess(res, { user })
}

exports.update = async (req, res) => {
  try {
    const params = permitParameter(req.body, UPDATEBLE_PARAMETER)
    const user = await UserServices.updateUser(req.currentUser._id, params)
    sendSuccess(res, { user })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, passwordConfirmation } = req.body
    const isMatch = await UserModel.comparePassword(
      oldPassword,
      req.currentUser.password
    )
    if (!isMatch || newPassword !== passwordConfirmation)
      return sendError(res, 404, PasswordNotMatch)
    user.password = newPassword
    await user.save()
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.suggestUsers = async (req, res) => {
  try {
    const perPage = req.query.perPage || settings.defaultPerPage
    const numberPage = req.query.numberPage || 1
    const sortBy = req.query.sortBy || 'create_at'
    const sortOrder = req.query.sortOrder || 'DESC'
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    const { suggestUsers, total } = await UserServices.getListSuggested(
      req.currentUser,
      numberPage,
      perPage
    )
    sendSuccess(res, {
      users: suggestUsers,
      pagination: { total, page: numberPage, perPage },
    })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.blockUser = async (req, res) => {
  try {
    const { userId, type } = req.params
    const user = req.currentUser
    const friend = await findFriend(userId)
    if (!friend) return sendError(res, 404, NoData)
    switch(type) {
      case 'block_message':
        await UserServices.blockMessage(user, userId);
        break;
      case 'block_diary':
        await UserServices.blockDiary(user, userId);
        break;
      default:
        return sendSuccess(res, {});
    }
    sendSuccess(res, {})
  } catch (error) {}
}

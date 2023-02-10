const { UPDATEBLE_PARAMETER } = require('../const/userConstant')
const { NoData, PasswordNotMatch } = require('../libs/errors')
const permitParameter = require('../libs/parameter')
const { sendSuccess, sendError } = require('../libs/response')
const UserModel = require('../models/users')
const FriendsModel = require('../models/friends')
const UserServices = require('../services/UserServices')
const { APPROVED } = require('../const/friendConstant')
const _ = require('lodash')

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
    const user = req.currentUser
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

exports.getProfile = async (req, res) => {
  try {
    const loggedInUserId = req.currentUser._id.toString()
    const userId = req.params.id

    const user = await UserModel.findById(userId)
    const newUser = _.cloneDeep({ ...user._doc })

    // check if logged in user is friend of this user
    if (userId !== loggedInUserId) {
      const friend = await FriendsModel.findOne({
        $or: [
          {
            userId,
            requestedUserId: loggedInUserId,
          },
          {
            userId: loggedInUserId,
            requestedUserId: userId,
          },
        ],
        status: APPROVED,
      })

      newUser.is_friend = !!friend
    }

    sendSuccess(res, newUser)
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

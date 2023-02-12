const settings = require('../configs/settings')
const { UPDATEBLE_PARAMETER } = require('../const/userConstant')
const { NoData, PasswordNotMatch } = require('../libs/errors')
const permitParameter = require('../libs/parameter')
const { sendSuccess, sendError } = require('../libs/response')
const UserModel = require('../models/users')
const FriendsModel = require('../models/friends')
const { findFriend } = require('../services/FriendServices')
const UserServices = require('../services/UserServices')
const _ = require('lodash')
const { NO_REQUEST } = require('../const/friendConstant')
const { getSameFriend } = require('../decorators/FriendDecorators')

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

exports.suggestUsers = async (req, res) => {
  try {
    const perPage = req.query.perPage || settings.defaultPerPage
    const numberPage = req.query.numberPage || 1
    const sortBy = req.query.sortBy || 'createdAt'
    const sortOrder = req.query.sortOrder || 'DESC'
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    const { suggestUsers, total } = await UserServices.getListSuggested(
      req.currentUser,
      numberPage,
      perPage
    )

    const result = await getSameFriend(req.currentUser._id, suggestUsers)

    sendSuccess(res, {
      users: result,
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
    switch (type) {
      case 'block_message':
        await UserServices.blockMessage(user, userId)
        break
      case 'block_diary':
        await UserServices.blockDiary(user, userId)
        break
      default:
        return sendSuccess(res, {})
    }
    sendSuccess(res, {})
  } catch (error) {}
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
          // {
          //   userId,
          //   requestedUserId: loggedInUserId,
          // },
          {
            userId,
            requestedUserId: loggedInUserId,
          },
        ],
        // status: APPROVED,
      })

      newUser.friend_status = friend?.status ?? NO_REQUEST
    }

    sendSuccess(res, newUser)
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.search = async (req,res) => {
  try {
    const { searchText } = req.query
    const perPage = req.query.perPage || settings.defaultPerPage
    const numberPage = req.query.numberPage || 1
    const {users, total} = await UserServices.searchUser(searchText,numberPage,perPage, req.currentUser._id)
    sendSuccess(res, {
      users,
      pagination: { total, page: numberPage, perPage },
    })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}
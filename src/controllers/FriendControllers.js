const { APPROVED, REJECTED } = require('../const/friendConstant')
const { sendError, sendSuccess } = require('../libs/response')
const { NoData } = require('../libs/errors')
const FriendServices = require('../services/FriendServices')

exports.create = async (req, res) => {
  try {
    const { userId } = req.params
    const requestedUserId = req.currentUser._id
    const friend = await FriendServices.createFriendRequest({
      userId,
      requestedUserId,
    })
    sendSuccess(res, { friend })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.approved = async (req, res) => {
  try {
    const { friendRequestId } = req.params
    const userId = eq.currentUser._id
    const friend = await FriendServices.findOneByFilter({
      userId,
      _id: friendRequestId,
    })
    if (!friend) return sendError(res, 404, NoData)
    await FriendServices.updateFriendRequest(userId, friend.requestedUserId, {
      status: APPROVED,
    })
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.reject = async (req, res) => {
  try {
    const { friendRequestId } = req.params
    const userId = eq.currentUser._id
    const friend = await FriendServices.findOneByFilter({
      userId,
      _id: friendRequestId,
    })
    if (!friend) return sendError(res, 404, NoData)
    await FriendServices.updateFriendRequest(userId, friend.requestedUserId, {
      status: REJECTED,
    })
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.index = async (req, res) => {
  try {
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.indexSameFriend = async (req, res) => {
  try {
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.indexRequest = async (req, res) => {
  try {
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

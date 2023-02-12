const { APPROVED, REJECTED, PENDING } = require('../const/friendConstant')
const { sendError, sendSuccess } = require('../libs/response')
const { NoData } = require('../libs/errors')
const FriendServices = require('../services/FriendServices')
const settings = require('../configs/settings')
const {
  getSameFriend,
  getFriendStatus,
} = require('../decorators/FriendDecorators')

exports.create = async (req, res) => {
  try {
    const { userId } = req.params
    const requestedUserId = req.currentUser._id
    const friend = await FriendServices.createFriendRequest({
      userId,
      requestedUserId,
      user: req.currentUser,
      deviceId: req.deviceId
    })
    if (!friend) return sendError(res, 404, NoData)
    sendSuccess(res, { friend })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.indexCancelRequest = async (req, res) => {
  try {
    const { userId } = req.params
    const requestedUserId = req.currentUser._id

    await FriendServices.cancelFriendRequest({
      userId,
      requestedUserId,
    })

    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.approved = async (req, res) => {
  try {
    const { userId } = req.params
    const loggedInUserId = req.currentUser._id

    const friend = await FriendServices.findOneByFilter({
      userId: loggedInUserId,
      requestedUserId: userId,
      status: PENDING,
    })

    if (!friend) return sendError(res, 404, NoData)

    await FriendServices.updateFriendRequest(loggedInUserId, userId, {
      status: APPROVED,
    })

    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.reject = async (req, res) => {
  try {
    const { userId } = req.params
    const loggedInUserId = req.currentUser._id

    const friend = await FriendServices.findOneByFilter({
      userId: loggedInUserId,
      requestedUserId: userId,
      status: PENDING,
    })

    if (!friend) return sendError(res, 404, NoData)

    await FriendServices.updateFriendRequest(loggedInUserId, userId, {
      status: REJECTED,
    })

    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.index = async (req, res) => {
  try {
    const { userId } = req.params
    const perPage = req.query.perPage || settings.defaultPerPage
    const numberPage = req.query.numberPage || 1
    const sortBy = req.query.sortBy || 'createdAt'
    const sortOrder = req.query.sortOrder || 'DESC'
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    const friends = await FriendServices.findListFriendByPaginate(
      userId,
      numberPage,
      perPage,
      sortCondition
    )
    let countTotal = await FriendServices.countListFriend(userId)
    let result = await getSameFriend(userId, friends)
    result = await getFriendStatus(req.currentUser._id, result)

    sendSuccess(res, {
      friends: result,
      pagination: { total: countTotal, page: numberPage, perPage },
    })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.indexSameFriend = async (req, res) => {
  try {
    const { userId } = req.params
    const user = req.currentUser
    const perPage = req.query.perPage || settings.defaultPerPage
    const numberPage = req.query.numberPage || 1
    const sortBy = req.query.sortBy || 'create_at'
    const sortOrder = req.query.sortOrder || 'DESC'
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    const friendIds = (await FriendServices.findListFriend(user._id)).map(
      (friend) => friend._id
    )
    const friends = await FriendServices.findListSameFriendsByPaginate(
      friendIds,
      userId,
      numberPage,
      perPage,
      sortCondition
    )
    let countTotal = await FriendServices.countListSameFriends(
      userId,
      friendIds
    )
    const result = await getSameFriend(user._id, friends)
    sendSuccess(res, {
      friends: result,
      pagination: { total: countTotal, page: numberPage, perPage },
    })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.indexRequest = async (req, res) => {
  try {
    const user = req.currentUser
    const { type } = req.params
    const perPage = req.query.perPage || settings.defaultPerPage
    const numberPage = req.query.numberPage || 1
    const sortBy = req.query.sortBy || 'create_at'
    const sortOrder = req.query.sortOrder || 'DESC'
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    let friendRequesteds = {}
    let countTotal
    switch (type) {
      case 'sent':
        friendRequesteds = await FriendServices.findFriendRequestSentByPaginate(
          user._id,
          numberPage,
          perPage,
          sortCondition
        )
        countTotal = await FriendServices.countListRequestedFriend(user._id)
        break
      case 'recieved':
        friendRequesteds =
          await FriendServices.findFriendRequestRecievedByPaginate(
            user._id,
            numberPage,
            perPage,
            sortCondition
          )
        countTotal = await FriendServices.countListRecievedFriend(user._id)
        break
      default:
        return sendError(res, 404, NoData)
    }
    const result = await getSameFriend(user._id, friendRequesteds)
    sendSuccess(res, {
      friendRequesteds: result,
      pagination: { total: countTotal, page: numberPage, perPage },
    })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

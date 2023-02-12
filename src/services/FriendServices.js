const { PENDING, APPROVED, REJECTED } = require('../const/friendConstant')
const {
  DIRECT_EXCHANGE_NAME,
  NOTIFICATION_QUEUE,
} = require('../const/messageQueueConstant')
const {
  NOTIFICATION_TYPE_NEW_REQUEST_FRIEND,
} = require('../const/notificationConstant')
const FriendModel = require('../models/friends')
const publishToExchange = require('./rabbitmq/publisher')

exports.createFriendRequest = async function ({
  userId,
  requestedUserId,
}) {
  const existedFriend = await this.findOneByFilter({
    userId,
    requestedUserId,
  })
  if (existedFriend) {
    if (existedFriend.status === REJECTED) {
      existedFriend.overwrite({ status: PENDING })
      return existedFriend.save()
    }
    return null
  }
  const friend = await FriendModel.create({ userId, requestedUserId })
  if (friend) {
    await publishToExchange(
      DIRECT_EXCHANGE_NAME,
      'direct',
      NOTIFICATION_QUEUE,
      { deviceId, userId, type: NOTIFICATION_TYPE_NEW_REQUEST_FRIEND }
    )
  }
  return friend 
}

exports.updateFriendRequest = async (userId, requestedUserId, attribute) => {
  return FriendModel.findOneAndUpdate({ userId, requestedUserId }, attribute, {
    new: true,
  })
}

exports.findFriendRequestSent = async (id) => {
  return FriendModel.find({
    requestedUserId: id,
    status: PENDING,
  }).populate('userId', 'username avatar')
}

exports.findFriendRequestSentByPaginate = async (
  id,
  numberPage,
  perPage,
  sortCondition
) => {
  const friends = await FriendModel.find({
    requestedUserId: id,
    status: PENDING,
  })
    .byPaginate(numberPage, perPage, sortCondition)
    .populate('userId', 'username avatar')
  return friends
    .filter((friend) => friend.userId)
    .map((friend) => friend.userId)
}

exports.findFriendRequestRecieved = async (id) => {
  return FriendModel.find({
    userId: id,
    status: PENDING,
  }).populate('requestedUserId', 'username avatar')
}

exports.findFriendRequestRecievedByPaginate = async (
  id,
  numberPage,
  perPage,
  sortCondition
) => {
  friends = await FriendModel.find({
    userId: id,
    status: PENDING,
  })
    .byPaginate(numberPage, perPage, sortCondition)
    .populate('requestedUserId', 'username avatar')
  return friends
    .filter((friend) => friend.userId)
    .map((friend) => friend.requestedUserId)
}

exports.findListFriendByPaginate = async (
  id,
  numberPage,
  perPage,
  sortCondition
) => {
  const friendRequesteds = await FriendModel.find({
    $or: [{ requestedUserId: id }, { userId: id }],
    status: APPROVED,
  })
    .byPaginate(numberPage, perPage, sortCondition)
    .populate('requestedUserId', 'username avatar')
    .populate('userId', 'username avatar')
  const frineds = friendRequesteds.map((friendRequested) => {
    return friendRequested.userId._id === id
      ? friendRequested.requestedUserId
      : friendRequested.userId
  })
  return frineds
}

exports.findListFriend = async (id) => {
  const friendRequesteds = await FriendModel.find({
    $or: [{ requestedUserId: id }, { userId: id }],
    status: APPROVED,
  })
  const frineds = friendRequesteds.map((friendRequested) => {
    return friendRequested.userId._id === id
      ? friendRequested.requestedUserId
      : friendRequested.userId
  })
  return frineds
}

exports.findFriend = async (userId) => {
  const friend = await FriendModel.findOne({
    $or: [{ requestedUserId: userId }, { userId }],
    status: APPROVED,
  })
  return friend
}

exports.findOneByFilter = async (filter) => {
  const friend = await FriendModel.findOne(filter)
  return friend
}

exports.findOneFriend = async (userId, requestedUserId) => {
  return FriendModel.findOne({
    status: APPROVED,
    $or: [
      { userId, requestedUserId },
      {
        userId: requestedUserId,
        requestedUserId: userId,
      },
    ],
  })
}

exports.findListSameFriends = async (friendIds, userId) => {
  const friends = await FriendModel.find({
    $or: [
      {
        requestedUserId: userId,
        userId: { $in: friendIds },
      },
      {
        userId: userId,
        requestedUserId: { $in: friendIds },
      },
    ],
    status: APPROVED,
  })
    .populate('requestedUserId', 'username avatar')
    .populate('userId', 'username avatar')
  return friends
}

exports.findListSameFriendsByPaginate = async (
  friendIds,
  userId,
  numberPage,
  perPage,
  sortCondition
) => {
  const friends = await FriendModel.find({
    $or: [
      {
        requestedUserId: userId,
        userId: { $in: friendIds },
      },
      {
        userId: userId,
        requestedUserId: { $in: friendIds },
      },
    ],
    status: APPROVED,
  })
    .byPaginate(numberPage, perPage, sortCondition)
    .populate('requestedUserId', 'username avatar')
    .populate('userId', 'username avatar')
  return friends
}

exports.countListFriend = async (id) => {
  return FriendModel.countDocuments({
    $or: [{ requestedUserId: id }, { userId: id }],
    status: APPROVED,
  })
}

exports.countListRequestedFriend = async (id) => {
  return FriendModel.countDocuments({
    requestedUserId: id,
    status: PENDING,
  })
}

exports.countListRecievedFriend = async (id) => {
  return FriendModel.countDocuments({
    userId: id,
    status: PENDING,
  })
}

exports.countListSameFriends = async (userId, friendIds) => {
  return FriendModel.countDocuments({
    $or: [
      {
        requestedUserId: userId,
        userId: { $in: friendIds },
      },
      {
        userId: userId,
        requestedUserId: { $in: friendIds },
      },
    ],
  })
}

const FriendServices = require('../services/FriendServices')

exports.getSameFriend = async function (userId, users) {
  if (!users.length) return users
  const result = [...users]
  const friendIds = (await FriendServices.findListFriend(userId)).map(
    (friend) => friend._id
  )
  for (const user of result) {
    const sameFriends = await FriendServices.findListSameFriends(
      friendIds,
      user._id
    )
    user._doc.totalSameFriend = sameFriends.length
  }
  return result
}

exports.getFriendStatus = async function (userId, users) {
  if (!users.length) return users
  const result = [...users]

  for (const user of result) {
    const friend = await FriendServices.findOneByFilter({
      $or: [
        {
          userId: user._id,
          requestedUserId: userId,
        },
      ],
    })

    user._doc.friend_status = friend?.status ?? NO_REQUEST
  }

  return result
}

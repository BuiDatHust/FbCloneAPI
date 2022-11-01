const FriendServices = require('../services/FriendServices')

exports.getSameFriend = async function (userId, users) {
  const result = [...users]
  for (const user of result) {
    const friends = await FriendServices.findListFriend(user._id)
    const friendIds = friends.map((friend) => friend._id)
    const sameFriends = await FriendServices.findListSameFriends(friendIds,userId)
    user._doc.totalSameFriend =sameFriends.length;
  }
  return result;
}

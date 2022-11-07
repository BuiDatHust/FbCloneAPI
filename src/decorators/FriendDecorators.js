const FriendServices = require('../services/FriendServices')

exports.getSameFriend = async function (userId, users) {
  const result = [...users]
  const friendIds = (await FriendServices.findListFriend(userId)).map((friend) => friend._id)
  for (const user of result) {
    const sameFriends = await FriendServices.findListSameFriends(friendIds,user._id)
    user._doc.totalSameFriend =sameFriends.length;
  }
  return result;
}

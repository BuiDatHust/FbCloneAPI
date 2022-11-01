const { PENDING, APPROVED } = require("../const/friendConstant");
const FriendModel = require("../models/friends")

exports.createFriendRequest = async (attribute) => {
    const friend = await FriendModel.create(attribute)
    return friend;
} 

exports.updateFriendRequest = async (userId, requestedUserId, attribute) => {
    const friend = await FriendModel.findOneAndUpdate({userId, requestedUserId}, attribute, {new: true})
    return friend;
}

exports.findFriendRequestSent = async (id) => {
    const friends = await FriendModel.find({
        requestedUserId: id,
        status: PENDING,
    })
    return friends;
}

exports.findFriendRequestRecieved = async (id) => {
    const friends = await FriendModel.find({
        userId: id,
        status: PENDING,
    })
    return friends;
}

exports.findListFriend = async (id) => {
    const friends = await FriendModel.find({
        $or: [
            {requestedUserId: id},
            {userId: id}
        ],
        status: APPROVED,
    })
    return friends;
}

exports.findOneByFilter = async (filter) => {
    const friend = await FriendModel.findOne(filter)
    return friend
}

exports.findListSameFriends = async (friendIds,userId) => {
    const friends = await FriendModel.find({
        $or: [
            {
                requestedUserId: userId,
                userId: { $in: friendIds},
            },
            {
                userId: userId,
                requestedUserId: { $in: friendIds}, 
            }
        ],
    }).populate('requestedUserId', 'username avatar').populate('userId', 'username avatar')
    return friends
}  
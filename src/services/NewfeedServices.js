const FollowerServices = require('../services/FollowerServices')
const PostServices = require('../services/PostServices')
const FriendServices = require('../services/FriendServices')

const getFollowerPost = async (userId, perPage, numberPage, sortCondition) => {
  const followers = await getFollowers(userId)
  const followerIds = followers.map((follower) => follower._id)
  return PostServices.findAllByPaginate(
    { userId: followerIds },
    perPage,
    numberPage,
    sortCondition
  )
}

const getFriendPosts = async (userId, perPage, numberPage, sortCondition) => {
  const friendIds = await FriendServices.findListFriend(userId)
  return PostServices.findAllByPaginate(
    { userId: friendIds },
    perPage,
    numberPage,
    sortCondition
  )
}

const getFollowers = async (userId) => {
  return FollowerServices.listFollowers(userId)
}

module.exports = { getFollowerPost, getFollowers, getFriendPosts }

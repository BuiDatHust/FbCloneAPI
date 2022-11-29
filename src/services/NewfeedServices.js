const FollowerServices = require('../services/FollowerServices')
const PostServices = require('../services/PostServices')

const getFollowerPost = async (userId, perPage, numberPage, sortCondition) => {
  const followers = await getFollowers(userId)
  const followerIds = followers.map((follower) => follower._id)
  console.log(followerIds)
  return PostServices.findAllByPaginate(
    { userId: followerIds },
    perPage,
    numberPage,
    sortCondition
  )
}

const getFollowers = async (userId) => {
  return FollowerServices.listFollowers(userId)
}

module.exports = { getFollowerPost, getFollowers }

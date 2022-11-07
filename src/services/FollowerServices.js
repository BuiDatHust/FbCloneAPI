const FollowerModel = require('../models/followers')

exports.follow = async (attribute) => {
  return await FollowerModel.create(attribute)
}

exports.findAllByPaginate = async (
  filter,
  perPage,
  numberPage,
  sortCondition
) => {
  return FollowerModel.find(filter).byPaginate(
    numberPage,
    perPage,
    sortCondition
  )
}

exports.countDocument = async (filter) => {
  return FollowerModel.countDocuments(filter)
}

exports.unfollow = async (userId, follower) => {
  return FollowerModel.findOneAndDelete({ userId, follower })
}

const UserModel = require('../models/users')
const friendServices = require('../services/FriendServices')

exports.findOne = async (filter) => {
  const user = await UserModel.findOne(filter)
  return user
}

exports.createOne = async (attribute) => {
  const user = new UserModel(attribute)
  await user.save()
  return user
}

exports.updateUser = async (id, attribute) => {
  const user = await UserModel.findByIdAndUpdate({ _id: id }, attribute, {
    new: true,
  })
  return user
}

exports.getListSuggested = async (user, numberPage, perPage, sortCondition) => {
  const friendIds = await friendServices.findListFriend(user._id)
  const filter = {
    countryCode: user.countryCode,
    _id: { $nin: friendIds },
  }
  const suggestUsers = await UserModel.find(filter).byPaginate(
    numberPage,
    perPage,
    sortCondition
  )
  console.log(suggestUsers)
  const total = await this.countDocument(filter)
  return { suggestUsers, total }
}

exports.countDocument = async (filter) => {
  return UserModel.countDocuments(filter)
}

exports.blockMessage = async (user, userId) => {
  if (user.blocked_inbox.includes(userId)) {
    return UserModel.updateOne(
      { _id: user._id },
      {
        $pullAll: {
          blocked_inbox: userId,
        },
      }
    )
  }
  user.blocked_inbox.push(userId);
  return user.save();
}

exports.blockDiary = async (user, userId) => {
  if (user.blocked_diary.includes(userId)) {
    return UserModel.updateOne(
      { _id: user._id },
      {
        $pullAll: {
          blocked_diary: userId,
        },
      }
    )
  }
  user.blocked_diary.push(userId);
  return user.save();
}
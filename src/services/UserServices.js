const UserModel = require('../models/users')

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

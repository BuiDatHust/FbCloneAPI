const PostModel = require('../models/posts')

exports.findOne = async (filter) => {
  const post = await PostModel.findOne(filter)
  return post
}

exports.create = async (attribute) => {
  const post = await PostModel.create(attribute)
  return post
}

exports.update = async (_id, attribute) => {
  const post = await PostModel.findByIdAndUpdate({ _id }, attribute, {
    new: true,
  })
  return post
}

exports.delete = async (_id) => {
  await PostModel.deleteOne({ _id })
  return
}

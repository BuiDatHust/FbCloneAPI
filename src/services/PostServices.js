const configs = require('../configs/configs')
const PostModel = require('../models/posts')

exports.findOne = async (filter) => {
  const post = await PostModel.findOne(filter)
  return post
}

exports.create = async (attribute) => {
  const post = await PostModel.create(attribute)
  const url = `http://${process.env.APP_URL_HOST}/post/${post._id}`
  post.url = url
  await post.save()
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

exports.findAllByPaginate = async (
  filter,
  perPage,
  numberPage,
  sortCondition
) => {
  return PostModel.find(filter)
    .populateData()
    .byPaginate(numberPage, perPage, sortCondition)
}

exports.countDocument = async (filter) => {
  const count = await PostModel.countDocuments(filter)
  return count
}

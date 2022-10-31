const CommentModel = require('../models/comments')

exports.findOne = async (filter) => {
  const comment = await CommentModel.findOne(filter)
  return comment
}

exports.findChildComment = async (commentId) => {
  const comments = await CommentModel.find({
      $and: [
        { commentId },
        { _id: { $ne: commentId} }
      ]
  })
  return comments
}

exports.findByPostId = async (postId) => {
  const comments = await CommentModel.findAll({ postId })
  return comments
}

exports.create = async (attribute) => {
  const comment = await CommentModel.create(attribute)
  return comment
}

exports.delete = async (filter) => {
  await CommentModel.deleteOne(filter)
  return
}

exports.update = async (_id, attribute) => {
  const comment = await CommentModel.findByIdAndUpdate({ _id }, attribute, {new:true})
  return comment
}

exports.findAllByPaginate = async (filter,perPage, numberPage, sortCondition) => {
  const comments = await CommentModel.find(filter).byPaginate(numberPage, perPage,sortCondition)
  return comments
}

exports.countDocument = async (filter) => {
  const count = await CommentModel.countDocuments(filter)
  return count
}
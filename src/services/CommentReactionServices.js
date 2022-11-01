const CommentReactionModel = require("../models/commentReactions")

exports.create = async (attribute) => {
    const reaction = await CommentReactionModel.create(attribute)
    return reaction
}

exports.findOne = async (filter) => {
    const reaction = await CommentReactionModel.findOne(filter)
    return reaction
}

exports.delete = async (filter) => {
    await CommentReactionModel.deleteOne(filter)
}

exports.findAllByPaginate = async (filter,perPage, numberPage, sortCondition) => {
    const reactions = await CommentReactionModel.find(filter).withUser().byPaginate(numberPage, perPage,sortCondition)
    return reactions
}
  
exports.countDocument = async (filter) => {
    const count = await CommentReactionModel.countDocuments(filter)
    return count
}
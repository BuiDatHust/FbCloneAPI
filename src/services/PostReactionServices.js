const PostReactionModel = require("../models/postReactions")

exports.create = async (attribute) => {
    const reaction = await PostReactionModel.create(attribute)
    return reaction
}

exports.findOne = async (filter) => {
    const reaction = await PostReactionModel.findOne(filter)
    return reaction
}

exports.delete = async (filter) => {
    await PostReactionModel.deleteOne(filter)
}

exports.findAllByPaginate = async (filter,perPage, numberPage, sortCondition) => {
    const reactions = await PostReactionModel.find(filter).withUser().byPaginate(numberPage, perPage,sortCondition)
    return reactions
}
  
exports.countDocument = async (filter) => {
    const count = await PostReactionModel.countDocuments(filter)
    return count
}
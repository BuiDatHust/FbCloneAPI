const MessageModel = require('../models/messages')

const createMessage = async (attribute) => {
  return MessageModel.create(attribute)
}

const findAllByPaginate = async (
  filter,
  perPage,
  numberPage,
  sortCondition
) => {
  return MessageModel.find(filter).byPaginate(numberPage, perPage, sortCondition)
}

const findMessageById = async (_id) => {
  return MessageModel.findOne({_id})
}

const updateMessageById = async (_id, attribute) => {
  return MessageModel.findOneAndReplace({_id}, attribute)
}

const countDocument = async (filter) => {
  return MessageModel.countDocuments(filter)
}

module.exports = {
  createMessage,
  findAllByPaginate,
  countDocument,
  findMessageById,
  updateMessageById
}

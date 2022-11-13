const ChatSettingModel = require('../models/chatSettings')

const createChat = async (attribute) => {
  const chatSetting = await findOneChatByUserId(
    attribute.firstUserId,
    attribute.secondUserId
  )
  if (chatSetting) return updateChatSetting(chatSetting._id, chatSetting)
  return ChatSettingModel.create(attribute)
}

const findOneChatByUserId = async (message_from, message_to) => {
  return ChatSettingModel.find({
    $or: [
      {
        firstUserId: message_from,
        secondUserId: message_to,
      },
      {
        firstUserId: message_to,
        secondUserId: message_from,
      },
    ],
  })
}

const updateChatSetting = async (id, attribute) => {
  return ChatSettingModel.findByIdAndUpdate({ _id: id }, attribute, {
    new: true,
  })
}

const findAllByPaginate = async (
  filter,
  user,
  perPage,
  numberPage,
  sortCondition
) => {
  return ChatSettingModel.find({
    ...filter,
    $or: [{ firstUserId: user._id }, { secondUserId: user._id }],
  }).byPaginate(numberPage, perPage, sortCondition)
}

const countDocument = async (filter) => {
  return MessageModel.countDocuments({
    ...filter,
    $or: [{ firstUserId: user._id }, { secondUserId: user._id }],
  })
}

module.exports = {
  createChat,
  findOneChatByUserId,
  updateChatSetting,
  findAllByPaginate,
  countDocument,
}

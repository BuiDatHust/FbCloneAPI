const settings = require("../configs/settings");
const { NoData } = require("../libs/errors");
const { sendSuccess, sendError } = require("../libs/response");
const ChatSettingServices = require('../services/ChatServices');
const MessageServices = require('../services/MessageServices');

exports.index = async (req, res) => {
  try {
    const {userId} = req.params;
    const user = req.currentUser;
    const chatSetting = await ChatSettingServices.findOneChatByUserId(userId, user._id)
    if(!chatSetting) return sendError(res, 404, NoData)
    const filter = {chatId: chatSetting._id}
    const perPage = req.query.perPage || settings.defaultMessagePerPage
    const numberPage = req.query.numberPage || 1
    const sortBy = req.query.sortBy || 'create_at'
    const sortOrder = req.query.sortOrder || 'ASC'
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    if (content) filter.content = { $regex: `.*${content}.*` }
    const messages = await MessageServices.findAllByPaginate(
      filter,
      perPage,
      numberPage,
      sortCondition
    )
    let countTotal = await MessageServices.countDocument(filter)
    sendSuccess(res, {
      messages,
      pagination: { total: countTotal, page: numberPage, perPage },
    })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}
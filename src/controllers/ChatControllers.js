const settings = require("../configs/settings");
const { sendSuccess, sendError } = require("../libs/response");
const ChatServices = require('../services/ChatServices')

exports.index = async (req,res) => {
    try {
        const user = req.currentUser;
        const {isPending} = req.query;
        const filter = {isPending: false}
        const perPage = req.query.perPage || settings.defaultPerPage
        const numberPage = req.query.numberPage || 1
        const sortBy = req.query.sortBy || 'create_at'
        const sortOrder = req.query.sortOrder || 'ASC'
        const sortCondition = {}
        sortCondition[sortBy] = sortOrder
        if(isPending) filter.isPending = isPending
        const chats = await ChatServices.findAllByPaginate(
          filter,
          user,
          perPage,
          numberPage,
          sortCondition
        )
        let countTotal = await ChatServices.countDocument(filter,user)
        sendSuccess(res, {
          chats,
          pagination: { total: countTotal, page: numberPage, perPage },
        })
      } catch (error) {
        sendError(res, 500, error.message, error)
      }
}
const settings = require('../configs/settings')
const { sendError, sendSuccess } = require('../libs/response')
const FollowerService = require('../services/FollowerServices')

exports.create = async (req, res) => {
  try {
    const { userId } = req.params
    const user = req.currentUser
    const follow = await FollowerService.follow({ userId, follower: user._id })
    sendSuccess(res, { follow })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.index = async (req, res) => {
  try {
    const user = req.currentUser
    const filter = { userId: user._id }
    const perPage = req.query.perPage || settings.defaultPerPage;
    const numberPage  = req.query.numberPage || 1;
    const sortBy = req.query.sortBy || 'create_at';
    const sortOrder = req.query.sortOrder || 'DESC';
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    const posts = await FollowerService.findAllByPaginate(filter, perPage, numberPage, sortCondition)
    let countTotal = await FollowerService.countDocument(filter)
    sendSuccess(res, {posts, pagination: {total: countTotal, page: numberPage, perPage}})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

const { sendError, sendSuccess } = require('../libs/response')
const CommentReactionServices = require('../services/CommentReactionServices')
const { NoData } = require('../libs/errors')
const settings = require('../configs/settings')

exports.create = async (req, res) => {
  try {
    const { reactType, commentId } = req.body
    const commentReaction = await CommentReactionServices.create({
      reactType,
      commentId,
      userId: req.currentUser._id,
    })
    sendSuccess(res, { commentReaction })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.delete = async (req, res) => {
  try {
    const { commentReactionId } = req.params
    const commentReaction = await CommentReactionServices.findOne({
      _id: commentReactionId,
      userId: req.currentUser._id,
    })
    if (!commentReaction) return sendError(res, 404, NoData)
    await CommentReactionServices.delete({ _id: commentReactionId })
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.index = async (req, res) => {
  try {
    const { commentId } = req.params
    const filter = { commentId }
    const { reactType } = req.query
    if(reactType) filter.reactType = reactType
    const perPage = req.query.perPage || settings.defaultPerPage
    const numberPage = req.query.numberPage || 1
    const sortBy = req.query.sortBy || 'create_at'
    const sortOrder = req.query.sortOrder || 'DESC'
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    const comments = await CommentReactionServices.findAllByPaginate(
      filter,
      perPage,
      numberPage,
      sortCondition
    )
    let countTotal = await CommentReactionServices.countDocument(filter)
    sendSuccess(res, {
      comments,
      pagination: { total: countTotal, page: numberPage, perPage },
    })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

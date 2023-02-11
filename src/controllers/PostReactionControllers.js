const { sendError, sendSuccess } = require('../libs/response')
const PostReactionServices = require('../services/PostReactionServices')
const { NoData } = require('../libs/errors')
const settings = require('../configs/settings')

exports.create = async (req, res) => {
  try {
    const { reactType, postId } = req.body

    const reaction = await PostReactionServices.findOne({
      reactType,
      postId,
      userId: req.currentUser._id,
    })

    if (reaction) {
      // already react => delete
      await PostReactionServices.delete({ _id: reaction._id })
      sendSuccess(res, {})
      return
    }

    // if not => create new one
    const postReaction = await PostReactionServices.create({
      reactType,
      postId,
      userId: req.currentUser._id,
    })
    sendSuccess(res, { postReaction })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.delete = async (req, res) => {
  try {
    const { postReactionId } = req.params
    const postReaction = await PostReactionServices.findOne({
      _id: postReactionId,
      userId: req.currentUser._id,
    })
    if (!postReaction) return sendError(res, 404, NoData)
    await PostReactionServices.delete({ _id: postReactionId })
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.index = async (req, res) => {
  try {
    const { postId } = req.params
    const filter = { postId }
    const { reactType } = req.query
    if (reactType) filter.reactType = reactType
    const perPage = req.query.perPage || settings.defaultPerPage
    const numberPage = req.query.numberPage || 1
    const sortBy = req.query.sortBy || 'create_at'
    const sortOrder = req.query.sortOrder || 'DESC'
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    const posts = await PostReactionServices.findAllByPaginate(
      filter,
      perPage,
      numberPage,
      sortCondition
    )
    let countTotal = await PostReactionServices.countDocument(filter)
    sendSuccess(res, {
      posts,
      pagination: { total: countTotal, page: numberPage, perPage },
    })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

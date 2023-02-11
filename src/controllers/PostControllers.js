const {
  UPDATEABLE_PARAMETER,
  CREATEABLE_PARAMETER,
} = require('../const/postConstant')
const { NoData } = require('../libs/errors')
const permitParameter = require('../libs/parameter')
const { sendError, sendSuccess } = require('../libs/response')
const PostModel = require('../models/posts')
const PostServices = require('../services/PostServices')
const settings = require('../configs/settings')

exports.index = async (req, res) => {
  try {
    const { userId } = req.params
    const { status, describe } = req.query
    const filter = { userId }
    const perPage = req.query.perPage || settings.defaultPerPage
    const numberPage = req.query.numberPage || 1
    const sortBy = req.query.sortBy || 'createdAt'
    const sortOrder = req.query.sortOrder || 'DESC'
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    if (status) filter.status = status
    if (describe) filter.describe = { $regex: `.*${describe}.*` }
    const posts = await PostServices.findAllByPaginate(
      filter,
      perPage,
      numberPage,
      sortCondition
    )

    // decorate post with extra fields
    const decoratedPosts = await PostServices.decoratePost(
      userId,
      posts.map((p) => p._doc)
    )

    let countTotal = await PostServices.countDocument(filter)
    sendSuccess(res, {
      posts: decoratedPosts,
      pagination: { total: countTotal, page: numberPage, perPage },
    })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.show = async (req, res) => {
  try {
    const { postId } = req.params
    const post = await PostServices.findOne({ _id: postId })
    if (!post) return sendError(res, 404, NoData)
    sendSuccess(res, { post })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.create = async (req, res) => {
  try {
    const params = permitParameter(req.body, CREATEABLE_PARAMETER)
    params.userId = req.currentUser._id
    const post = await PostServices.create(params)
    sendSuccess(res, { post })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.update = async (req, res) => {
  try {
    const { postId } = req.params
    const params = permitParameter(req.body, UPDATEABLE_PARAMETER)
    const post = await PostModel.findOne({
      postId,
      userId: req.currentUser._id,
    })
    if (!post) return sendError(res, 404, NoData)
    updatedPost = await PostServices.update(postId, params)
    sendSuccess(res, { updatedPost })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.delete = async (req, res) => {
  try {
    const { postId } = req.params
    const post = await PostServices.findOne({
      _id: postId,
      userId: req.currentUser._id,
    })
    if (!post) return sendError(res, 404, NoData)
    await PostServices.delete(post._id)
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

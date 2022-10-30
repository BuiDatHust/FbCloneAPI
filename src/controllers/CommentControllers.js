const { sendError, sendSuccess } = require('../libs/response')
const permitParameter = require('../libs/parameter')
const {
  CREATEABLE_PARAMETER,
  UPDATEABLE_PARAMETER,
} = require('../const/commentConstant')
const CommentServices = require('../services/CommentServices')
const { NoData } = require('../libs/errors')

exports.create = async (req, res) => {
  try {
    const params = permitParameter(req.body, CREATEABLE_PARAMETER)
    params.userId = req.currentUser._id
    const comment = await CommentServices.create(params)
    sendSuccess(res, { comment })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.index = async (req, res) => {
  try {
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.show = async (req, res) => {
  try {
    const { commentId } = req.params
    let comment = await CommentServices.findOne({ _id: commentId })
    if (!comment) return sendError(res, 404, NoData)
    const child = await CommentServices.findChildComment(commentId)
    comment._doc.childs = child;
    sendSuccess(res, { comment })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.update = async (req, res) => {
  try {
    const params = permitParameter(req.body, UPDATEABLE_PARAMETER)
    const { commentId } = req.params
    const comment = await CommentServices.findOne({
      _id: commentId,
      userId: req.currentUser._id,
    })
    if (!comment) return sendError(res, 404, NoData)
    const updatedComment = await CommentServices.update(commentId, params)
    sendSuccess(res, { updatedComment })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.delete = async (req, res) => {
  try {
    const { commentId } = req.params
    const comment = await CommentServices.findOne({
      _id: commentId,
      userId: req.currentUser._id,
    })
    if (!comment) return sendError(res, 404, NoData)
    await CommentServices.delete({_id: commentId})
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

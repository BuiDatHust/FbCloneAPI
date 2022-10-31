const { sendError, sendSuccess } = require('../libs/response')
const permitParameter = require('../libs/parameter')
const {
  CREATEABLE_PARAMETER,
  UPDATEABLE_PARAMETER,
} = require('../const/commentConstant')
const CommentServices = require('../services/CommentServices')
const { NoData } = require('../libs/errors')
const settings = require('../configs/settings')
const { POST_TYPE, COMMENT_TYPE } = require('../const/postConstant')

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

exports.show = async (req, res) => {
  try {
    const {id,type} = req.params;
    const {describe} = req.query;
    const filter = {}
    switch(type) {
      case 'post':
        filter.postId = id;
        filter.type = POST_TYPE;
        break;
      case 'comment':
        filter.commentId = id;
        filter.type = COMMENT_TYPE;
        break;
      default:
        return sendError(res, 404, NoData);
    }
    const perPage = req.query.perPage || settings.defaultPerPage;
    const numberPage  = req.query.numberPage || 1;
    const sortBy = req.query.sortBy || 'create_at';
    const sortOrder = req.query.sortOrder || 'DESC';
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    if(describe) filter.describe = { $regex: `.*${describe}.*`}
    const posts = await CommentServices.findAllByPaginate(filter, perPage, numberPage, sortCondition)
    let countTotal = await CommentServices.countDocument(filter)
    sendSuccess(res, {posts, pagination: {total: countTotal, page: numberPage, perPage}})
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

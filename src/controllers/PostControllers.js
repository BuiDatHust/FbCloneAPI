const { UPDATEABLE_PARAMETER, CREATEABLE_PARAMETER } = require('../const/postConstant')
const { NoData } = require('../libs/errors')
const permitParameter = require('../libs/parameter')
const { sendError, sendSuccess } = require('../libs/response')
const PostModel = require('../models/posts')
const PostServices = require('../services/PostServices')

exports.index = async (req, res) => {
  try {
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.show = async (req, res) => {
  try {
    const {postId} = req.params;
    const post = await PostServices.findOne({postId});
    if(!post) return sendError(res, 404, NoData)
    sendSuccess(res, {post})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.create = async (req, res) => {
  try {
    const params = permitParameter(req.body, CREATEABLE_PARAMETER)
    const {baseUrl} = req.body;
    params.userId = req.currentUser._id
    const post = await PostServices.create(params)
    const url = baseUrl + post._id
    await PostServices.update(post.id, { url })
    sendSuccess(res, { post })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.update = async (req, res) => {
  try {
    const {postId} = req.params
    const params = permitParameter(req.body, UPDATEABLE_PARAMETER)
    const post = await PostModel.findOne({postId, userId: req.currentUser._id})
    if(!post) return sendError(res, 404, NoData)
    updatedPost = await PostServices.update(postId, params) 
    sendSuccess(res, {updatedPost})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

exports.delete = async (req, res) => {
  try {
    const {postId}= req.params;
    const post = await PostServices.findOne({_id: postId, userId: req.currentUser._id})
    if(!post) return sendError(res, 404, NoData)
    await PostServices.delete(post._id)
    sendSuccess(res, {})
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

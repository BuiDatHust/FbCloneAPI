const settings = require('../configs/settings')
const { sendSuccess, sendError } = require('../libs/response')
const NewfeedServices = require('../services/NewfeedServices')
const { decoratePost } = require('../services/PostServices')

const getMore = async (req, res) => {}

const getNew = async (req, res) => {
  try {
    const user = req.currentUser
    const perPage = req.query.perPage || settings.defaultPerPage
    const numberPage = req.query.numberPage || 1
    const sortBy = req.query.sortBy || 'createdAt'
    const sortOrder = req.query.sortOrder || 'DESC'
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    const posts = await NewfeedServices.getFriendPosts(
      user._id,
      perPage,
      numberPage,
      sortCondition
    )

    const result = await decoratePost(
      user._id,
      posts.map((p) => p._doc)
    )

    sendSuccess(res, {
      posts: result,
      pagination: { page: numberPage, perPage },
    })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

module.exports = { getMore, getNew }

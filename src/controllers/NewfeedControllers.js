const settings = require('../configs/settings')
const { sendSuccess, sendError } = require('../libs/response')
const NewfeedServices = require('../services/NewfeedServices')

const getMore = async (req, res) => {}

const getNew = async (req, res) => {
  try {
    const user = req.currentUser
    const perPage = req.query.perPage || settings.defaultPerPage
    const numberPage = req.query.numberPage || 1
    const sortBy = req.query.sortBy || 'create_at'
    const sortOrder = req.query.sortOrder || 'DESC'
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    const posts = await NewfeedServices.getFollowerPost(
      user._id,
      perPage,
      numberPage,
      sortCondition
    )
    sendSuccess(res, {
      posts,
      pagination: { page: numberPage, perPage },
    })
  } catch (error) {
    sendError(res, 500, error.message, error)
  }
}

module.exports = { getMore, getNew }

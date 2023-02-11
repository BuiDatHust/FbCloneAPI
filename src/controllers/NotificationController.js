const settings = require('../configs/settings')
const { sendSuccess, sendError } = require('../libs/response')
const { findAllByPaginate, deleteNoti } = require('../services/NotificationServices')

exports.index = async (req, res) => {
  try {
    const filter = { userId: req.currentUser._id }
    const perPage = req.query.perPage || settings.defaultPerPage
    const numberPage = req.query.numberPage || 1
    const sortBy = req.query.sortBy || 'create_at'
    const sortOrder = req.query.sortOrder || 'DESC'
    const sortCondition = {}
    sortCondition[sortBy] = sortOrder
    
  console.log(filter,
    numberPage,
    perPage,
    sortCondition);
    const { notifications, total } = await findAllByPaginate(
      filter,
      perPage,
      numberPage,
      sortCondition
    )
    sendSuccess(res, {
      notifications,
      pagination: { total, page: numberPage, perPage },
    })
  } catch (error) {
    console.log(error)
    sendError(res, 500, { error })
  }
}

exports.delete = async (req, res) => {
  try {
    const {notificationId} = req.params
    await deleteNoti(notificationId, req.currentUser._id);
    sendSuccess(res,{})
  } catch (error) {
    console.log(error)
    sendError(res, 500, { error })
  }
}

const NotificationModel = require('../models/notifications')

exports.createNoti = async (attribute) => {
  return NotificationModel.create(attribute)
}

exports.findAllByPaginate = async (
  filter,
  perPage,
  numberPage,
  sortCondition
) => {
  const notifications = await NotificationModel.find(
    filter,
    numberPage,
    perPage,
    sortCondition
  )
  const total = await NotificationModel.countDocuments(filter)
  return { notifications, total }
}

exports.deleteNoti = async (notificationId,userId) => {
  const noti = await NotificationModel.findOne({ _id: notificationId, userId })
  if (noti) return
  return NotificationModel.deleteOne({ _id: notificationId })
}

const {
  NOTIFICATION_TYPE_ACCEPTED_FRIEND,
  NOTIFICATION_TYPE_NEW_REQUEST_FRIEND,
  NOTIFICATION_TYPE_NEW_COMMENT_REACTION,
  NOTIFICATION_TYPE_NEW_COMMENT,
  NOTIFICATION_TYPE_NEW_POST_REACTION,
} = require('../const/notificationConstant')

exports.prepareNotiContent = ({ data, type }) => {
  const { user, reactType } = data
  switch (type) {
    case NOTIFICATION_TYPE_ACCEPTED_FRIEND:
      return `${user.username} đã chấp nhận lời mời kết bạn của bạn`
    case NOTIFICATION_TYPE_NEW_REQUEST_FRIEND:
      return `${user.username} đã gửi lời mời kết bạn cho bạn`
    case NOTIFICATION_TYPE_NEW_COMMENT_REACTION:
      return `${user.username} đã thả ${reactType} bình luận của bạn`
    case NOTIFICATION_TYPE_NEW_COMMENT:
      return `${user.username} đã bình luận bài viết của bạn`
    case NOTIFICATION_TYPE_NEW_POST_REACTION:
      return `${user.username} đã thả ${reactType} bài viết của bạn`
    default:
      return ''
  }
}

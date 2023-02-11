const { Schema, default: mongoose } = require('mongoose')
const { NOTIFICATION_TYPE, NOTIFICATION_TYPE_ACCEPTED_FRIEND } = require('../const/notificationConstant')

const notificationsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    type: {
      type: String,
      enum: NOTIFICATION_TYPE,
      default: NOTIFICATION_TYPE_ACCEPTED_FRIEND,
    },
    content: {
      type: String,
      required: true,
    },
    linkPost: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

notificationsSchema.query.byPaginate = function (
  pageNumber,
  nPerPage,
  sortCondition
) {
  return this.sort(sortCondition)
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage)
}

const NotificationModel = mongoose.model('Notification', notificationsSchema)

module.exports = NotificationModel

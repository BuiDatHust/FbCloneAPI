const { Schema, default: mongoose } = require('mongoose')
const { TYPE_MESSAGE } = require('../const/chatConstant')

const messagesSchema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'ChatSettings',
      required: true,
    },
    message_from: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    message_to: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    parent_message_id: {
      type: Schema.Types.ObjectId,
      ref: 'Messages',
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: Object.values(TYPE_MESSAGE),
      default: TYPE_MESSAGE['text'],
    },
    sent_at: {
      type: Date,
      required: false,
    },
    isSelfDeleted: {
      type: Boolean,
      default: false,
    },
    is_deleted: {
      type: Boolean,
      default: false,
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

messagesSchema.query.byPaginate = function (pageNumber, nPerPage,sortCondition) {
  return this.sort(sortCondition)
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage)
}

const MessageModel = mongoose.model('Messages', messagesSchema)

module.exports = MessageModel

const { Schema, default: mongoose } = require('mongoose')
const { TYPE_MESSAGE } = require('../const/chatConstant')

const messagesSchema = new Schema(
  {
    group_id: {
      type: Schema.Types.ObjectId,
      ref: 'Groups',
      required: true,
    },
    message_from_id: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    parentMessageId: {
      type: Schema.Types.ObjectId,
      ref: 'Messages',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: Object.values(TYPE_MESSAGE),
      default: TYPE_MESSAGE['text'],
    },
    sent_user_ids: {
      type: Date,
      required: false,
    },
    isSelfDeleted: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    is_e2e_encryption: {
      type: Boolean,
      default: false,
    },
    common_key: {
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

const MessageModel = mongoose.model('GroupMessages', messagesSchema)

module.exports = MessageModel

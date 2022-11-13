const { Schema, default: mongoose } = require('mongoose')
const { TYPE_CHAT } = require('../const/chatConstant')
const { REACTION_ENUM } = require('../const/postConstant')

const messageReactionsSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    message_id: {
      type: Schema.Types.ObjectId,
      ref: 'Comments',
      required: false,
    },
    message_group_id: {
      type: Schema.Types.ObjectId,
      ref: 'GroupMessages',
      required: false,
    },
    type: {
      type: Object.values(TYPE_CHAT),
      default: TYPE_CHAT['single']
    },
    react_type: {
      type: String,
      enum: REACTION_ENUM,
      required: true,
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

const MessageReactionModel = mongoose.model(
  'MessageReactions',
  messageReactionsSchema
)

module.exports = MessageReactionModel

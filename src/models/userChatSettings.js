const { Schema, default: mongoose } = require('mongoose')
const { TYPE_CHAT } = require('../const/chatConstant')

const userChatSettingsSchema = new Schema(
  {
    chat_setting_id: {
      type: Schema.Types.ObjectId,
      ref: 'ChatSettings',
      required: false,
    },
    chat_group_setting_id: {
      type: Schema.Types.ObjectId,
      ref: 'Groups',
      required: false,
    },
    type: {
      type: Object.values(TYPE_CHAT),
      default: TYPE_CHAT['single'],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    is_send_notification: {
      type: String,
      default: false,
    },
    turn_on_notification_at: {
      type: String,
      required: false,
    },
    is_turn_off_notification_forever: {
      type: Boolean,
      required: false,
    },
    is_block: {
      type: Boolean,
      default: true,
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

const UserChatSettingModel = mongoose.model(
  'UserChatSettings',
  userChatSettingsSchema
)

module.exports = UserChatSettingModel

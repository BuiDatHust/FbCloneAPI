const { Schema, default: mongoose } = require('mongoose')

const chatSettingsSchema = new Schema(
  {
    firstUserId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    secondUserId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    firstUserNickName: {
      type: String,
      required: true,
    },
    secondUserNickName: {
      type: String,
      required: true,
    },
    defaultIcon: {
      type: String,
      required: false,
    },
    is_e2e_encryption: {
      type: Boolean,
      default: false,
    },
    common_key: {
      type: String,
      required: false,
    },
    isPending: {
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

chatSettingsSchema.query.byPaginate = function (pageNumber, nPerPage,sortCondition) {
  return this.sort(sortCondition)
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage)
}

const ChatSettingModel = mongoose.model('ChatSettings', chatSettingsSchema)

module.exports = ChatSettingModel

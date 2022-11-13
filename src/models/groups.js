const { Schema, default: mongoose } = require('mongoose')

const groupsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    participant_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    admin_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    defaultIcon: {
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

const GroupModel = mongoose.model('Groups', groupsSchema)

module.exports = GroupModel

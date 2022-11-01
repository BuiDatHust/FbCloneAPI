const { Schema, default: mongoose } = require('mongoose')

const followersSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    follower: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
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
const FollowerModel = mongoose.model('Followers', followersSchema)

module.exports = FollowerModel

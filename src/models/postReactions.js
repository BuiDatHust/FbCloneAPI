const { Schema, default: mongoose } = require('mongoose')
const { REACTION_ENUM } = require('../const/postConstant')

const postReactionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Posts',
        required: true,
    },
    react: {
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

const PostReactionModel = mongoose.model('PostReactions', postReactionsSchema)

module.exports = PostReactionModel
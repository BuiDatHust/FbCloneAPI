const { Schema, default: mongoose } = require('mongoose')
const { REACTION_ENUM } = require('../const/postConstant')

const commentReactionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comments',
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

const CommentReactionModel = mongoose.model('CommentReactions', commentReactionsSchema)

module.exports = CommentReactionModel
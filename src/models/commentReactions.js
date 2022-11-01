const { Schema, default: mongoose } = require('mongoose')
const { REACTION_ENUM } = require('../const/postConstant')
const CommentModel = require('./comments')

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
    reactType: {
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

commentReactionsSchema.post('deleteOne',{ document: true, query: false }, async function(doc,next){
  await CommentModel.findByIdAndUpdate({_id: doc.commentId}, { $inc: {totalReaction: -1}  })
  next()
})
commentReactionsSchema.post('save', async function (doc,next) {
  await CommentModel.findByIdAndUpdate({_id: doc.commentId}, { $inc: {totalReaction: 1}  })
  next()
})

commentReactionsSchema.query.byPaginate = function (pageNumber, nPerPage,sortCondition) {
  return this.sort(sortCondition)
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage)
}
commentReactionsSchema.query.withUser = function() {
  return this.populate('userId', 'username avatar')
}

const CommentReactionModel = mongoose.model('CommentReactions', commentReactionsSchema)

module.exports = CommentReactionModel
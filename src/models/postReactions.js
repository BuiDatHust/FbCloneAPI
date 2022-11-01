const { Schema, default: mongoose } = require('mongoose')
const { REACTION_ENUM } = require('../const/postConstant')
const PostModel = require('./posts');

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

postReactionsSchema.post('deleteOne',{ document: true, query: false }, async function(doc,next){
  await PostModel.findByIdAndUpdate({_id: doc.postId}, { $inc: {totalReaction: -1}  })
  next()
})
postReactionsSchema.post('save', async function (doc,next) {
  await PostModel.findByIdAndUpdate({_id: doc.postId}, { $inc: {totalReaction: 1}  })
  next()
})

postReactionsSchema.query.byPaginate = function (pageNumber, nPerPage,sortCondition) {
  return this.sort(sortCondition)
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage)
}
postReactionsSchema.query.withUser = function() {
  return this.populate('userId', 'username avatar')
}

const PostReactionModel = mongoose.model('PostReactions', postReactionsSchema)

module.exports = PostReactionModel
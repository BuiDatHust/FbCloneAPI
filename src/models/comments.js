const { Schema, default: mongoose } = require('mongoose')

const commentsSchema = new Schema(
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
    commentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comments',
      required: false,
    },
    describe: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: false,
    },
    videos: {
      type: Array,
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

commentsSchema.post('deleteOne',{document:true, query: false}, async function(doc, next){
  await CommentModel.deleteMany({commentId: doc._id})
  next()
})
commentsSchema.query.byPaginate = function (pageNumber, nPerPage,sortCondition) {
  return this.sort(sortCondition)
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage)
}

const CommentModel = mongoose.model('Comments', commentsSchema)

module.exports = CommentModel

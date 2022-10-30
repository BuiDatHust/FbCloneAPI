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
  console.log(111)
  await CommentModel.deleteMany({commentId: doc._id})
  next()
})

const CommentModel = mongoose.model('Comments', commentsSchema)

module.exports = CommentModel

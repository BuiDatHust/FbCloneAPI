const { Schema, default: mongoose } = require('mongoose')
const { POST_TYPE, COMMENT_TYPE } = require('../const/postConstant')
const PostModel = require('./posts')

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
    type: {
      type: String,
      enum: [POST_TYPE, COMMENT_TYPE],
      default: POST_TYPE,
    },
    describe: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: false,
    },
    totalComment: {
      type: Number,
      default: 0,
    },
    totalReaction: {
      type: Number,
      default: 0,
    },
    isComment: {
      type: Boolean,
      default: true,
    },
    isReact: {
      type: Boolean,
      default: true,
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

commentsSchema.post(
  'deleteOne',
  async function (doc, next) {
    try {
      await CommentModel.deleteMany({ commentId: doc._id })
      await PostModel.findByIdAndUpdate(
        { _id: this.postId },
        { $inc: { totalComment: -1 } }
      )
    } catch (error) {
      console.log(error)
    }
    next()
  }
)
commentsSchema.post(
  'save',
  async function (doc, next) {
    try {
      await PostModel.findByIdAndUpdate(
        { _id: doc.postId },
        {
          $inc: { totalComment: 1 },
        }
      )
    } catch (error) {
      console.log(error)
    }
    next()
  }
)
commentsSchema.query.byPaginate = function (
  pageNumber,
  nPerPage,
  sortCondition
) {
  return this.sort(sortCondition)
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage)
}

const CommentModel = mongoose.model('Comments', commentsSchema)

module.exports = CommentModel

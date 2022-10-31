const { Schema, default: mongoose } = require('mongoose')
const { STATUS_ENUM } = require('../const/postConstant')
const CommentServices = require('../services/CommentServices')

const postsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    images: {
      type: [
        {
          type: String,
        },
      ],
      required: false,
    },
    videos: {
      type: [
        {
          type: String,
        },
      ],
      required: false,
    },
    describe: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: STATUS_ENUM,
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
    url: {
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

postsSchema.pre('save', function (next) {
  if (this.images.length && this.videos.length) {
    throw new Error('Chi co 1 trong 2: anh hoac video!')
  }
  next()
})
postsSchema.post(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    await CommentServices.delete({ postId: this._id })
    next()
  }
)
postsSchema.query.byPaginate = function (pageNumber, nPerPage,sortCondition) {
  return this.sort(sortCondition)
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage)
}

const PostModel = mongoose.model('Posts', postsSchema)

module.exports = PostModel

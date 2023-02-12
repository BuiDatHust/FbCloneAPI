const { Schema, default: mongoose } = require('mongoose')
const { APPROVED, PENDING, REJECTED } = require('../const/friendConstant')
const FollowerService = require('../services/FollowerServices')
const ChatSettingServices = require('../services/ChatServices')

const friendsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    requestedUserId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    status: {
      type: String,
      enum: [APPROVED, PENDING, REJECTED],
      default: PENDING,
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

friendsSchema.post('save', async function (doc, next) {
  console.log('---after save---')
  await FollowerService.follow({
    userId: doc.userId,
    follower: doc.requestedUserId,
  }),
    next()
})
friendsSchema.post('findOneAndUpdate', async function (doc, next) {
  console.log('---after update---', this.getUpdate().$set, doc)
  const updatedData = this.getUpdate().$set
  if (doc.status === APPROVED && updatedData['status']) {
    await Promise.all([
      FollowerService.follow({
        userId: doc.requestedUserId,
        follower: doc.userId,
      }),
      ChatSettingServices.createChat({
        firstUserId: doc.requestedUserId,
        follower: doc.userId,
      }),
    ])
  }
  if (doc.status === REJECTED && updatedData['status']) {
    await Promise.all([
      FollowerService.unfollow(doc.userId, doc.requestedUserId),
      FollowerService.unfollow(doc.requestedUserId, doc.userId),
    ])
  }
  next()
})

friendsSchema.query.byPaginate = function (
  pageNumber,
  nPerPage,
  sortCondition
) {
  return this.sort(sortCondition)
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage)
}

const FriendModel = mongoose.model('Friends', friendsSchema)

module.exports = FriendModel

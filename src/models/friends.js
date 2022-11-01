const { Schema, default: mongoose } = require('mongoose')
const { APPROVED, PENDING, REJECTED } = require('../const/friendConstant')

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

friendsSchema.post('create', async function (doc, next){
    console.log('---after create---')
})
friendsSchema.post('findOneAndUpdate', async function (doc, next){
    console.log('---after findOneAndUpdate---')
})

const FriendModel = mongoose.model('Friends', friendsSchema)

module.exports = FriendModel

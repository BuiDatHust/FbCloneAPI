const { Schema, default: mongoose } = require('mongoose')
const { REPORT_POST_TYPE, REPORT_USER_TYPE, PENDING, APPROVED, REJECT, REPORT_COMMENT_TYPE } = require('../const/reportConstant')
const CommunityRuleModel = require('./communityRules')

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
    type: {
      type: String,
      enum: [REPORT_POST_TYPE, REPORT_USER_TYPE, REPORT_COMMENT_TYPE],
      default: REPORT_USER_TYPE,
    },
    comunityRules: {
      type: [CommunityRuleModel],
      required: true,
    },
    status: {
      type: String,
      enum: [PENDING, APPROVED, REJECT],
      default: PENDING
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

const CommentSchema = mongoose.Model('Comments', commentsSchema)

module.exports = CommentSchema

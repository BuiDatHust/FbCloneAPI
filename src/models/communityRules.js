const { Schema, default: mongoose } = require('mongoose')
const { REPORT_POST_TYPE, REPORT_USER_TYPE } = require('../const/reportConstant')

const communityRulesSchema = new Schema(
  {
    comunityRuleId: {
      type: Schema.Types.ObjectId,
      ref: 'CommunityRules',
      required: false,
    },
    type: {
      type: String,
      enum: [REPORT_POST_TYPE, REPORT_USER_TYPE],
      default: REPORT_USER_TYPE,
    },
    question: {
      type: String,
      required: false,
    },
    content: {
      type: String,
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

const CommunityRuleModel = mongoose.model('CommunityRules', communityRulesSchema)

module.exports = CommunityRuleModel

const STATUS_ENUM = ['hạnh phúc', 'buồn', 'tức giận', 'lười biếng']
const REACTION_ENUM = ['like', 'angry', 'love']
const POST_TYPE = 'post'
const COMMENT_TYPE = 'comment'
const CREATEABLE_PARAMETER = [
  'userId',
  'images',
  'status',
  'videos',
  'describe',
  'url',
]
const UPDATEABLE_PARAMETER = ['images', 'videos', 'status', 'describe']

module.exports = {
  STATUS_ENUM,
  REACTION_ENUM,
  CREATEABLE_PARAMETER,
  UPDATEABLE_PARAMETER,
  POST_TYPE,
  COMMENT_TYPE,
}

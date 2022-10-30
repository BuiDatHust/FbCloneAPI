const STATUS_ENUM = ['hạnh phúc', 'buồn', 'tức giận', 'lười biếng']
const REACTION_ENUM = ['Thích', 'Tức giận', 'Thương thương', 'Yêu thích']
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
}

const GENDER_SECRET = 'secret'
const GENDER_MALE = 'male'
const GENDER_FEMALE = 'female'
const MAX_FRIEND = 500
const WHITELIST_ACCESS_TOKEN_PATTERN = 'whitelist_access_token_'
const OTP_SMS_PATTERN = 'otp_sms_'
const CREATEBLE_PARAMETER = [
  'phone',
  'username',
  'firstName',
  'password',
  'lastName',
  'gender',
  'date_of_birth',
  'description',
  'current_address',
  'worked_at',
  'studied_at',
  'from_address',
  'city',
  'country',
  'avatar',
  'cover_image',
]
const UPDATEBLE_PARAMETER = [
  'phone',
  'username',
  'firstName',
  'lastName',
  'gender',
  'date_of_birth',
  'description',
  'current_address',
  'from_address',
  'worked_at',
  'studied_at',
  'city',
  'country',
  'avatar',
  'cover_image',
]

module.exports = {
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_SECRET,
  MAX_FRIEND,
  WHITELIST_ACCESS_TOKEN_PATTERN,
  CREATEBLE_PARAMETER,
  UPDATEBLE_PARAMETER,
  OTP_SMS_PATTERN,
}

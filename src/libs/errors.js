const NoData = {
  code: 8,
  message: 'No data available',
}

const InternalError = {
  code: 131,
  message: 'Internal error',
}

const BadAuthentication = {
  code: 215,
  message: 'Bad authentication data',
}

const OtpNotCorrect = {
  code: 216,
  message: 'Otp not correct',
}

const RegiteredPhone = {
  code: 400,
  message: 'Phone Registered!',
}

const PasswordNotMatch = {
  code: 400,
  message: 'Password Not Match',
}

const PasswordNotCorrect = {
  code: 400,
  message: 'Password Not Correct',
}

const DeviceIdIsMissing = {
  code: 400,
  message: 'DeviceId Is Missing',
}

module.exports = {
  NoData,
  InternalError,
  BadAuthentication,
  RegiteredPhone,
  PasswordNotMatch,
  PasswordNotCorrect,
  DeviceIdIsMissing,
  OtpNotCorrect
}

require('dotenv').config()

module.exports = {
  esmsConfig: {
    ApiKey: process.env.ESMS_API_KEY,
    SecretKey: process.env.ESMS_SECRET_KEY,
    Brandname: 'FNOTIFY',
    SmsType: '2',
    campaignid: 'lms',
  },
  mailerTransporter: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  },
  redis: {
    host: process.env.REDIS_HOST_NAME || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST_NAME || 'localhost'}:${parseInt(process.env.REDIS_PORT) || 6379}`
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    senderPhone: process.env.TWILIO_PHONE_NUMBER,
  },
}

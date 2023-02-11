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
  s3: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
    endpoint: process.env.S3_ENDPOINT,
    params: {
      ACL: 'public-read',
      Bucket: process.env.S3_BUCKET_NAME,
    },
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL,
    delayTime:process.env.RABBITMQ_DELAY_TIME,
    numRetry: process.env.RABBITMQ_NUM_RETRY, 
  },
  app: {
    host: process.env.APP_URL_HOST
  }
}

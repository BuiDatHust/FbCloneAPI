require('dotenv').config();

module.exports = {
  defaultPerPage: '12',
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      'DAF857A1240D46FED4FDEA13016F2FC126C4D4C1C84056B082A176238C166BD7',
    ttl: 60 * 60 * 24 * 1000,
  },
  sessionSecret:
    'bUfxkJXG5xOtaOqRyTmXqWGl4ZxNSyAPbJGVfc7DKix2lyBMJn6TtmKQER52q2eC',
  preSignExpiration: 60 * 60 * 2,
  hashSalt: 10,
  otpTtl: 5 * 60,
  fileStorageHost: process.env.FILE_STORAGE_HOST || 'https://flextech-dev.s3-ap-southeast-1.amazonaws.com',
  fileUploaderEndpoint: process.env.FILE_UPLOADER_ENDPOINT || 'https://ft-zcode-storage-service-api-dev-pdpxzax4za-as.a.run.app/files',
  imageStorageHost: process.env.IMAGE_STORAGE_HOST || 'https://flextech-dev.s3-ap-southeast-1.amazonaws.com',
  imageUploaderEndpoint: process.env.IMAGE_UPLOADER_ENDPOINT || 'http://103.163.214.14:8083/images?category=content',
  videoStorageHost: process.env.VIDEO_STORAGE_HOST || 'https://flextech-dev.s3-ap-southeast-1.amazonaws.com',
  videoUploaderEndpoint: process.env.VIDEO_UPLOADER_ENDPOINT || 'https://ft-zcode-storage-service-api-dev-pdpxzax4za-as.a.run.app/videos',
  regex: {
    email: /^(([A-Za-z0-9]{1,}(\.)?)*[A-Za-z0-9]{1,})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /^(84|0)[1-9][0-9]{8,9}$/,
    countryCode: /^\+(\d{1}\-)?(\d{1,3})$/,
  },
  prefix: {
    imageMime: 'image',
    videoMime: 'video',
    fileMime: 'application',
  },
};

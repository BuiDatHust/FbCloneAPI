require('dotenv').config();

module.exports = {
  mongodb: {
    host: process.env.MONGODB_HOST_NAME || 'localhost',
    port: parseInt(process.env.MONGODB_PORT) || 27017,
    options: {
      dbName: process.env.MONGODB_DATABASE_NAME || 'fb-clone',
      user: process.env.MONGODB_USERNAME,
      pass: process.env.MONGODB_PASSWORD,
      autoCreate: true,
    },
  },
}
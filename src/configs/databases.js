require('dotenv').config()

module.exports = {
  mongodb: {
    url: process.env.MONGODB_URL,
  },
}

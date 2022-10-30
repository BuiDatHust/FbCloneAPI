const redis = require('redis')
const configs = require('../configs/configs')
const redisClient = redis.createClient({ url: configs.redis.url })

const connectRedis = () => {
  (async () => {
    await redisClient.connect()
  })()

  console.log('Connecting to the Redis')

  redisClient.on('ready', () => {
    console.log('Connected to the Redis!')
  })

  redisClient.on('error', (err) => {
    console.log('Error in the Connection')
  })
}

module.exports = { redisClient, connectRedis }

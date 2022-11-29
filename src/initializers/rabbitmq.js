const amqp = require('amqplib')
const configs = require('../configs/configs')

class RabbitMQ {
  async initialize(countRetry = 0) {
    try {
      const connection = await amqp.connect(configs.rabbitmq.url)
      console.info('Connect rabbitmq success!')
      this.connection = connection
      const channel = await connection.createChannel()
      this.channel = channel
      await this.consume()

      connection.on('error', (err) => this.retryConnect(countRetry, err))
    } catch (err) {
      this.retryConnect(countRetry, err)
    }
  }

  retryConnect(countRetry, err) {
    console.log(err)
    if (countRetry <= configs.rabbitmq.numRetry) {
      console.log('retry connect rabbitmq')
      setTimeout(async () => {
        await this.initialize(countRetry++)
      }, configs.rabbitmq.delayTime)
    }
  }

  async consume() {
    
  }
}

module.exports = new RabbitMQ()

const amqp = require('amqplib')
const configs = require('../configs/configs')
const { DIRECT_QUEUE, EXCHANGE_NAME } = require('../const/messageQueueConstant')
const {
  directQueueHandler,
} = require('../services/rabbitmq/consumer/directQueueHandler')

class RabbitMQ {
  async initialize(countRetry = 0) {
    try {
      const connection = await amqp.connect(configs.rabbitmq.url)
      console.info('Connect rabbitmq success!')
      this.connection = connection
      const channel = await connection.createChannel()
      this.channel = channel

      await this.createExchange()

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

  async consume(exchangeName) {
    for (const queueName of DIRECT_QUEUE) {
      await this.channel.assertQueue(queueName)
      await this.channel.bindQueue(queueName, exchangeName)
      await this.channel.consume(queueName, (message) =>
        directQueueHandler(message, queueName)
      )
    }
  }

  async createExchange() {
    await Promise.all(EXCHANGE_NAME.map(async (exchange) => {
      await this.channel.assertExchange(exchange.name, exchange.topic, {
        durable: false
      });
      await this.consume(exchange.name)
    }))
  }
}

module.exports = new RabbitMQ()

const rabbitmq = require('../../initializers/rabbitmq')

const publish = async (exchangeName, exchangeType, routingKey, payload) => {
  await rabbitmq.channel.assertExchange(exchangeName, exchangeType, {
    durable: true,
  })
  await rabbitmq.channel.publish(
    exchangeName,
    routingKey,
    Buffer.from(JSON.stringify(payload)),
    { durable: true }
  )
}

module.exports = publish
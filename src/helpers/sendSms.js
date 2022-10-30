const configs = require('../configs/configs')
const client = require('twilio')(
  configs.twilio.accountSid,
  configs.twilio.authToken
)

const sendMessage = (body, phone) => {
  return client.messages.create({
    body,
    from: configs.twilio.senderPhone,
    to: phone,
  })
}

module.exports = sendMessage;

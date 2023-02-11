const FOLLOW_QUEUE = 'follow_queue'
const NEWFEED_QUEUE = 'newfeed_queue'
const NOTIFICATION_QUEUE = 'notification_queue'

const DIRECT_EXCHANGE_NAME = 'direct_fb_clone_api_exchange'

const EXCHANGE_NAME = [
  {
    name: DIRECT_EXCHANGE_NAME,
    topic: 'direct',
  },
]
const DIRECT_QUEUE = [FOLLOW_QUEUE, NEWFEED_QUEUE, NOTIFICATION_QUEUE]

module.exports = {
  FOLLOW_QUEUE,
  NEWFEED_QUEUE,
  NOTIFICATION_QUEUE,
  EXCHANGE_NAME,
  DIRECT_EXCHANGE_NAME,
  DIRECT_QUEUE,
}

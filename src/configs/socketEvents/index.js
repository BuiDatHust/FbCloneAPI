const { ChatEvent } = require('./Chats')
const { SeenEvent } = require('./Seens')
const { TypingEvent } = require('./Typings')
const { StatusEvent } = require('./Status')
const { NotificationEvent } = require('./Notifications')

module.exports = (io, socket) => {
  ChatEvent(io, socket)
  SeenEvent(io, socket)
  StatusEvent(io, socket)
  TypingEvent(io, socket)
  NotificationEvent(io,socket)
}

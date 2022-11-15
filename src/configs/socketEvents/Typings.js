const { TYPING_EVENT } = require('../../const/socketConstant')
const TypingEventHandler = require('../../controllers/socket/TypingEventHandlers')

exports.TypingEvent = (io, socket) => {
  socket.on(TYPING_EVENT, (data) =>
    TypingEventHandler.TypingEvent(io, socket, TYPING_EVENT.at, data)
  )
}

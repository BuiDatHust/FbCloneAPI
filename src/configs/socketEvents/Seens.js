const { SEEN_MESSAGE_EVENT } = require('../../const/socketConstant')
const SeenEventHandler = require('../../controllers/socket/SeenEventHandlers')

exports.SeenEvent = (io, socket) => {
    socket.on(SEEN_MESSAGE_EVENT, (data) => SeenEventHandler.SeenMessage(io,socket,SEEN_MESSAGE_EVENT,data))
}
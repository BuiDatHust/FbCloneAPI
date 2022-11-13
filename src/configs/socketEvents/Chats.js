const { SEND_MESSAGE_EVENT, DELETE_MESSAGE_EVENT, SEND_GROUP_MESSAGE_EVENT } = require("../../const/socketConstant")
const ChatEventHandler = require('../../controllers/socket/ChatEventHandlers')
exports.ChatEvent = (io, socket) => {
    socket.on(SEND_MESSAGE_EVENT, (data) => ChatEventHandler.SendMessage(io,socket,SEND_MESSAGE_EVENT,data))
    socket.on(DELETE_MESSAGE_EVENT, (data) => {})
    socket.on(SEND_GROUP_MESSAGE_EVENT, (data) => {})
}
const { ChatEvent } = require("./Chats");
const { SeenEvent } = require("./Seens");
const { TypingEvent } = require("./Typings");

module.exports = (io, socket) => {
    ChatEvent(io, socket);
    SeenEvent(io,socket);
    TypingEvent(io,socket);
}
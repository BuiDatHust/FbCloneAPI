const { ONLINE_EVENT, OFFLINE_EVENT } = require('../../const/socketConstant')
const StatusEventHandler = require('../../controllers/socket/StatusEventHandlers')

exports.StatusEvent = (io, socket) => {
    socket.on(ONLINE_EVENT, (data) => StatusEventHandler.OnlineEvent(io,socket,ONLINE_EVENT,data))
    socket.on(OFFLINE_EVENT, (data) => StatusEventHandler.OfflineEvent(io,socket,OFFLINE_EVENT,data))
}
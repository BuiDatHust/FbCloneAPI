const getConsoleLogger = require('./consoleLoggers')

const errorLogger = getConsoleLogger('errorLogging')
const socketOutboundLogger = getConsoleLogger('inboundLogging')
errorLogger.addContext('requestType', 'HttpLogging')
socketOutboundLogger.addContext('requestType', 'SocketLogging')

const sendSuccess = (res, data, message) => {
  res.status(200).json({ message, data })
}

const sendError = (res, code, error, errorSubject) => {
  if (errorSubject) errorLogger.error(errorSubject)
  res.status(code).json({ error })
}

const socketResponse = (io, namespace, socketIds, eventName, data) => {
  socketOutboundLogger.info(`Emit eventName ${eventName} to socket with ids: ${socketIds.join(',')}`)
  socketIds.forEach(socketId => {
    if (!namespace) {
      io.to(socketId).emit(eventName, data);
    } else {
      io.of(namespace).to(socketId).emit(eventName, data);
    }
  })
}

module.exports = {
  sendError,
  sendSuccess,
  socketResponse
}

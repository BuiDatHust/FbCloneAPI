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

module.exports = {
  sendError,
  sendSuccess
}

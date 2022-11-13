const getConsoleLogger = require('./consoleLoggers')

const inboundLogger = getConsoleLogger('inboundLogging')
const parameterLogger = getConsoleLogger('parameterLogging')
inboundLogger.addContext('requestType', 'SocketLogging')
parameterLogger.addContext('requestType', 'SocketLogging')

exports.socketEventLogging = (io, socket, eventName, data) => {
  const parameters = { ...data }
  const formattedParameters = JSON.stringify(parameters, null, 1)
    .replace(/^ +/gm, ' ')
    .replace(/\n/g, '')
    .replace(/{ /g, '{')
    .replace(/ }/g, '}')
    .replace(/\[ /g, '[')
    .replace(/ \]/g, ']')

  inboundLogger.info(
    `Started event ${eventName} for socket with id: ${socket.id}`
  )
  parameterLogger.info(`${formattedParameters}`)
}

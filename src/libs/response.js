const getConsoleLogger = require('./consoleLoggers')

const errorLogger = getConsoleLogger('errorLogging');
const socketOutboundLogger = getConsoleLogger('inboundLogging');
errorLogger.addContext('requestType', 'HttpLogging');
socketOutboundLogger.addContext('requestType', 'SocketLogging');

export const sendSuccess = (res, data, message) => {
  res.status(200).json({ message, data });
};

export const sendError = (res, code, error, errorSubject) => {
  if (errorSubject) errorLogger.error(errorSubject);
  res.status(code).json({ error });
};

const { getLogger, configure } = require('log4js');

const config = {
  appenders: {
    inboundLogging: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[[%X{requestType}][%d]%] %m',
      },
    },
    parameterLogging: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[[%X{requestType}][Parameters]%] %m',
      },
    },
    errorLogging: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[[%X{requestType}][%p]%] %m',
      },
    },
  },
  categories: {
    default: { appenders: ['inboundLogging'], level: 'info' },
    inboundLogging: { appenders: ['inboundLogging'], level: 'info' },
    parameterLogging: { appenders: ['parameterLogging'], level: 'info' },
    errorLogging: { appenders: ['errorLogging'], level: 'error' },
  },
};

configure(config);

const getConsoleLogger = (category) => getLogger(category);

module.exports =  getConsoleLogger;

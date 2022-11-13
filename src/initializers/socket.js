const { socketEventLogging } = require('../libs/socketEventLoggers');
const socketEvents = require('../configs/socketEvents');
const socket = require('socket.io');
const { authenticateSocket } = require('../middlewares/authenticateSocket');
const { redisClient } = require('./redis');
const { SOCKET_REDIS_PREIX } = require('../const/socketConstant');

class SocketIO {
  init (server) {
    const io = socket(server, {
      handlePreflightRequest: (req, res) => {
        const headers = {
          'Access-Control-Allow-Headers': 'Content-Type, authorization',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': false,
        };
        res.writeHead(200, headers);
        res.end();
      },
    });

    const wrap = (middleware) => (socket, next) => middleware(socket, next);
    io.use(wrap(authenticateSocket));
    io.on('connection', async (socket) => {
      socketEventLogging(io,socket,'connection')
      await redisClient.rPush(
        `${SOCKET_REDIS_PREIX}${socket.request.currentUser._id}`,
        socket.id
      )
      socketEvents(io, socket);
    });
    io.on('disconnect', (socket) => {
      console.log(111)
      socketEventLogging(io,socket,'disconnection')
    })
  }
}

module.exports = new SocketIO();

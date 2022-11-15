const promisifyEmmitter = (io, namespace, socketId, eventName, data) => {
  if (!namespace) {
    return new Promise((resolve, reject) => {
      if (!namespace) {
        io.to(socketId).emit(eventName, data, (ack) => {
          console.log(ack)
          resolve(true)
        })
      } else {
        io.of(namespace)
          .to(socketId)
          .emit(eventName, data, (ack) => {
            console.log(ack)
            resolve(true)
          })
      }
    })
  }
}

module.exports = { promisifyEmmitter }

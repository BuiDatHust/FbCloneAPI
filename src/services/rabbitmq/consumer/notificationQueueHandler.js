const { sendPushNotification } = require("../../../helpers/sendNotification")

exports.notificationHandler = async (message) => {
  try {
    const { deviceId, content, title } = message
    await sendPushNotification(deviceId, title, content)
  } catch (error) {
    console.log(error)
  }
}

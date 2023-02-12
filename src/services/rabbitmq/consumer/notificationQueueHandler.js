const { NOTIFICATION_TITLE } = require("../../../const/notificationConstant");
const { prepareNotiContent } = require("../../../helpers/prepareNotifContent")
const { sendPushNotification } = require("../../../helpers/sendNotification");
const { findOne } = require("../../../models/users");

exports.notificationHandler = async (message) => {
  try {
    const { userId, type,reactType } = message
    const user = await findOne({_id: userId})
    if(!user.device_ids.length) return 
    const content = prepareNotiContent({user, reactType}, type);
    await sendPushNotification(user.device_ids, NOTIFICATION_TITLE, content)
  } catch (error) {
    console.log(error)
  }
}

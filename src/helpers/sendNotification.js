const admin = require('firebase-admin')
const fcm = require('fcm-notification')
const serviceAccount = require('../../.serviceAccount.json')
const certPath = admin.credential.cert(serviceAccount)
const FCM = new fcm(certPath)

exports.sendPushNotification = (fcm_token, title, body) => {
  try {
    let message = {
      android: {
        notification: {
          title: title,
          body: body,
        },
      },
      token: fcm_token,
    }

    FCM.send(message, function (err, resp) {
      if (err) {
        throw err
      } else {
        console.log('Successfully sent notification')
      }
    })
  } catch (err) {
    throw err
  }
}

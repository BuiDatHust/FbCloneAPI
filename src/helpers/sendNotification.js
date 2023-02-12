const admin = require('firebase-admin')
const fcm = require('fcm-notification')
const serviceAccount = require('../../.serviceAccount.json')
const certPath = admin.credential.cert(serviceAccount)
const FCM = new fcm(certPath)

exports.sendPushNotification = (fcm_tokens, title, body) => {
  try {
    let messages = fcm_tokens
      .filter((token) => !token)
      .map((fcm_token) => {
        return {
          android: {
            notification: {
              title: title,
              body: body,
            },
          },
          token: fcm_token,
        }
      })

    messages.forEach((message) => {
      FCM.send(message, function (err, resp) {
        if (err) {
          throw err
        } else {
          console.log('Successfully sent notification')
        }
      })
    })
  } catch (err) {
    throw err
  }
}

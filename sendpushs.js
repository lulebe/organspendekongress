const webpush = require('web-push')

const { Push } = require.main.require('./db')
const config = require.main.require('./config')

webpush.setVapidDetails('mailto:berg@uni-heidelberg.de', config.vapid, config.vapidPrivate)

module.exports = function (message) { //message currently not used
  Push.findAll()
  .then(pushs => {
    console.log(JSON.stringify(pushs))
    pushs.forEach(subscription => {
      const receiver = {
        endpoint: subscription.endpoint
      }
      if (subscription.auth)
        receiver.keys = {
          auth: subscription.auth,
          p256dh: subscription.p256dh
        }
      webpush.sendNotification(receiver)
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
    })
  })
}
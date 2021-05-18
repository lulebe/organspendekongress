const webpush = require('web-push')

const { Push } = require.main.require('./db')
const config = require.main.require('./config')

console.log('mailto:leander.berg@uni-heidelberg.de', config.vapid, config.vapidPrivate)
webpush.setVapidDetails('mailto:leander.berg@uni-heidelberg.de', config.vapid, config.vapidPrivate)

module.exports = function (message) {
  Push.findAll()
  .then(pushs => {
    pushs.forEach(subscription => {
      const receiver = {
        endpoint: subscription.endpoint
      }
      if (subscription.auth)
        receiver.keys = {
          auth: subscription.auth,
          p256dh: subscription.p256dh
        }
      webpush.sendNotification(receiver, message, {TTL: 3600*8})
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
    })
  })
}
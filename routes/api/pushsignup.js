const { Push } = require.main.require('./db')

module.exports = async (req, res) => {
  if (!req.body.endpoint) return res.status(400).send()
  const existingPush = await Push.findOne({where: {endpoint: req.body.endpoint}})
  if (existingPush) {
    existingPush.auth = req.body.auth
    existingPush.p256dh = req.body.p256dh
    existingPush.expirationTime = req.body.expirationTime
    await existingPush.save()
    return res.status(200).send()
  }
  const push = await Push.create({
    endpoint: req.body.endpoint,
    auth: req.body.auth,
    p256dh: req.body.p256dh,
    expirationTime: req.body.expirationTime
  })
  res.status(201).send({})
}
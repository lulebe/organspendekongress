const { Push } = require.main.require('./db')

module.exports = async (req, res) => {
  console.log(req)
  if (!req.body.endpoint) return res.status(400).send()
  const push = await Push.create({
    endpoint: req.body.endpoint,
    auth: req.body.auth,
    p256dh: req.body.p256dh,
    expirationTime: req.body.expirationTime
  })
  res.status(200).send({})
}
const config = require.main.require('./config')

module.exports = (req, res) => {
  res.send({vapid: config.vapid})
}
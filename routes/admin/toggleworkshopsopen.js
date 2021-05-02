const settings = require.main.require('./settings')

module.exports = async (req, res) => {
  await settings.set('workshopsopen', !settings.get('workshopsopen'))
  res.redirect('/admin')
}
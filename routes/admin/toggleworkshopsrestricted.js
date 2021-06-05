const settings = require.main.require('./settings')

module.exports = async (req, res) => {
  await settings.set('workshopsrestricted', !settings.get('workshopsrestricted'))
  res.redirect('/admin')
}
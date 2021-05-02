const config = require.main.require('./config')

module.exports = (req, res) => {
  if (req.body.password && req.body.password == config.ADMIN_PW) {
    req.session.loggedin = true
    res.redirect('/admin')
  }
  else
    res.redirect('/login')
}
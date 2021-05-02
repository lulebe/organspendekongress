const config = require.main.require('./config')

module.exports = (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.email)
    return res.redirect('/registerworkshops?error=form')
}
const tmpl = require.main.require('./templates')

module.exports = async (req, res) => {
  if (req.session.loggedin)
    return res.redirect('/admin')
  const opts = {
    
  }
  tmpl.render('login.twig', opts).then(rendered => res.end(rendered))
}
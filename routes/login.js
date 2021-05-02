const tmpl = require.main.require('./templates')

module.exports = async (req, res) => {
  const opts = {
    
  }
  tmpl.render('login.twig', opts).then(rendered => res.end(rendered))
}
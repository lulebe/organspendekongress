const tmpl = require.main.require('./templates')
const settings = require.main.require('./settings')
const { Workshop, User } = require.main.require('./db')

module.exports = async (req, res) => {
  const opts = {
    workshops: await Workshop.findAll({order: [['slot', 'ASC'], ['title', 'ASC']]}),
    workshopsopen: settings.get('workshopsopen'),
    userCount: await User.count()
  }
  tmpl.render('admin/index.twig', opts).then(rendered => res.end(rendered))
}
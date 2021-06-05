const tmpl = require.main.require('./templates')
const { User, Workshop } = require.main.require('./db')

module.exports = async (req, res) => {
  const users = await User.findAll({order:[['lastName', 'ASC'], [Workshop, 'slot', 'ASC']], include: [{model: Workshop, attributes: ['id', 'title', 'slot']}]})
  const opts = {
    users
  }
  tmpl.render('admin/users.twig', opts).then(rendered => res.end(rendered))
}
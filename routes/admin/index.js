const tmpl = require.main.require('./templates')
const settings = require.main.require('./settings')
const { Workshop, User } = require.main.require('./db')

module.exports = async (req, res) => {
  const opts = {
    workshops: await Workshop.findAll({order: [['slot', 'ASC'], ['title', 'ASC']], include: [{model: User, attributes: ['id']}]}),
    workshopsopen: settings.get('workshopsopen'),
    userCount: await User.count()
  }
  opts.workshops.forEach(ws -> ws.free = ws.maxPeople - ws.Users.length)
  tmpl.render('admin/index.twig', opts).then(rendered => res.end(rendered))
}
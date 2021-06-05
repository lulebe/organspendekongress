const tmpl = require.main.require('./templates')
const settings = require.main.require('./settings')
const { Workshop, User } = require.main.require('./db')

module.exports = async (req, res) => {
  const opts = {
<<<<<<< HEAD
    workshops: await Workshop.findAll({order: [['slot', 'ASC'], ['title', 'ASC']]}),
    workshopsopen: settings.get('workshopsopen'),
    workshopsrestricted: settings.get('workshopsrestricted')
=======
    workshops: await Workshop.findAll({order: [['slot', 'ASC'], ['title', 'ASC']], include: [{model: User, attributes: ['id']}]}),
    workshopsopen: settings.get('workshopsopen'),
    userCount: await User.count()
>>>>>>> c601704ece22eb54ed2f5a94c9937830b0e84f74
  }
  opts.workshops.forEach(ws => ws.free = ws.maxPeople - ws.Users.length)
  tmpl.render('admin/index.twig', opts).then(rendered => res.end(rendered))
}
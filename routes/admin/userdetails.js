const tmpl = require.main.require('./templates')
const { User, Workshop } = require.main.require('./db')
const settings = require.main.require('./settings')

module.exports = async (req, res) => {
  const user = await User.findByPk(req.params.userId, {order:[[Workshop, 'slot', 'ASC']], include: [{model: Workshop, attributes: ['id', 'title', 'slot']}]})
  const workshops = (await Workshop.findAll({group: 'slot'})).map(s => ({slot: s.dataValues.slot}))
  const rawWorkshops = await Promise.all(workshops.map(s => Workshop.findAll({
    where: {slot: s.slot},
    order: [['slot', 'ASC'], ['title', 'ASC']],
    include: [{model: User, attributes: ['id']}]
  })))
  workshops.forEach((slot, i) => {
    slot.workshops = rawWorkshops[i].map(w => w.dataValues)
    slot.workshops.forEach(ws => {
      ws.userCount = ws.Users.length,
      ws.free = ws.maxPeople - ws.Users.length,
      ws.isFree = ws.maxPeople > ws.Users.length
    })
  })
  const userWorkshopIds = []
  user.Workshops.forEach(ws => userWorkshopIds[ws.slot] = ws.id)
  const opts = {
    user,
    workshops,
    userWorkshopIds,
    restricted: settings.get('workshopsrestricted'),
    fromWorkshop: req.query.ws
  }
  tmpl.render('admin/userdetails.twig', opts).then(rendered => res.end(rendered))
}
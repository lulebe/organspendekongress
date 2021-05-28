const tmpl = require.main.require('./templates')
const { Workshop, User } = require.main.require('./db')


module.exports = async (req, res) => {
  const workshops = (await Workshop.findAll({group: 'slot'})).map(s => ({slot: s.dataValues.slot}))
  const rawWorkshops = await Promise.all(workshops.map(s => Workshop.findAll({
    where: {slot: s.slot},
    include: [{model: User, attributes: ['id']}]
  })))
  workshops.forEach((slot, i) => {
    slot.workshops = rawWorkshops[i].map(w => w.dataValues)
    slot.workshops.forEach(ws => {
      ws.free = ws.maxPeople - ws.Users.length
    })
  })
  const opts = {
    workshops,
    error: req.query.error
  }
  tmpl.render('registerworkshops.twig', opts).then(rendered => res.end(rendered))
}
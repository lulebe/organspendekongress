const settings = require.main.require('./settings')
const tmpl = require.main.require('./templates')
const { Workshop, User } = require.main.require('./db')
const { Op } = require("sequelize")

module.exports = async (req, res) => {
  if (!settings.get('workshopsopen')) return res.redirect('/')
  if (!req.body.firstname || !req.body.lastname || !req.body.email)
    return res.redirect('/registerworkshops?error=form')
  const slotPicks = []
  Object.keys(req.body).filter(s => s.substr(0, 4) == 'slot').forEach(slot => {
    slotPicks.push({slot, workshop: req.body[slot]})
  })

  //check if attendance limits reached
  const invalidRequest = (await Promise.all(slotPicks.map(pick => Workshop.findByPk(pick.workshop, {
      include: [{model: User, attributes: ['id']}]
    })
  ))).some(ws => ws.Users.length >= ws.maxPeople)
  if (invalidRequest)
    return res.redirect('/registerworkshops?error=form')
  
  const userP = User.create({firstName: req.body.firstname, lastName: req.body.lastname, email: req.body.email})
  userP.catch(e => {
    res.redirect('/registerworkshops?error=form')
  })
  const workshops = await Workshop.findAll({where: {id: {[Op.or]: slotPicks.map(pick => pick.workshop)}}})
  await (await userP).addWorkshops(workshops)
  tmpl.render('registerworkshops_post.twig', {}).then(rendered => res.end(rendered))
}
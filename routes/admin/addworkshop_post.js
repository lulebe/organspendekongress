const tmpl = require.main.require('./templates')
const { Workshop } = require.main.require('./db')

module.exports = async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.slot || !req.body.people)
    return res.redirect('/admin/addworkshop')
  if (req.query.id) {
    const ws = await Workshop.findByPk(req.query.id)
    ws.title = req.body.title
    ws.description = req.body.description
    ws.host = req.body.host || null
    ws.slot = req.body.slot
    ws.maxPeople = req.body.people
    ws.allowRestricted = !!req.body.allowrestricted
    await ws.save()
  } else
    await Workshop.create({
      title: req.body.title,
      description: req.body.description,
      host: req.body.host || null,
      slot: parseInt(req.body.slot),
      maxPeople: parseInt(req.body.people)
    })
  res.redirect('/admin')
}
const tmpl = require.main.require('./templates')
const { Workshop, User } = require.main.require('./db')

module.exports = async (req, res) => {
  const person = await User.findByPk(req.params.userId)
  await person.destroy()
  const workshop = await Workshop.findByPk(req.params.workshopId)
  if (workshop)
    res.redirect("/admin/addworkshop?id="+workshop.id)
  else
    res.redirect("/admin")
}
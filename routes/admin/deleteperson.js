const tmpl = require.main.require('./templates')
const { Workshop, User } = require.main.require('./db')

module.exports = async (req, res) => {
  const person = await User.findByPk(req.params.userId)
  await person.destroy()
  if (req.query.ws)
    res.redirect("/admin/addworkshop?id="+req.query.ws)
  else if (req.query.users)
    res.redirect("/admin/users")
  else
    res.redirect("/admin")
}
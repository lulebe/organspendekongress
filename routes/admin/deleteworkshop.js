const tmpl = require.main.require('./templates')
const { Workshop } = require.main.require('./db')

module.exports = async (req, res) => {
  if (!req.query.id) return res.redirect('/admin')
  const ws = await Workshop.findByPk(req.query.id)
  await ws.destroy()
  res.redirect('/admin')
}
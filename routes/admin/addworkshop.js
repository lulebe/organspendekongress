const tmpl = require.main.require('./templates')
const { Workshop } = require.main.require('./db')

module.exports = async (req, res) => {
  let workshop = false
  let people = false
  if (req.query.id) {
    workshop = await Workshop.findByPk(req.query.id)
    people = await workshop.getUsers({order: [['lastName', 'ASC']]})
  }
  const opts = {
    workshop, people
  }
  tmpl.render('admin/addworkshop.twig', opts).then(rendered => res.end(rendered))
}
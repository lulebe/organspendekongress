const tmpl = require.main.require('./templates')

module.exports = async (req, res) => {
  const workshops = [{
    slot: 1,
    workshops: [
      {id: 1, title: "Test 1", free: 4},
      {id: 3, title: "Test 2", free: 1},
      {id: 4, title: "Test 3", free: 0}
    ]
  },
  {
    slot: 2,
    workshops: [
      {id: 7, title: "Test 4", free: 0},
      {id: 9, title: "Test 5", free: 0},
      {id: 13, title: "Test 6", free: 0}
    ]
  }]
  const opts = {
    workshops,
    error: !!req.query.error
  }
  tmpl.render('registerworkshops.twig', opts).then(rendered => res.end(rendered))
}
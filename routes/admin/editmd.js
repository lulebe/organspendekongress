const tmpl = require.main.require('./templates')
const fs = require('fs').promises
const path = require('path')

module.exports = async (req, res) => {
  const opts = {
    markdown: await fs.readFile(path.join(global.appRoot, 'homepagetext.md'), 'utf-8')
  }
  tmpl.render('admin/editmd.twig', opts).then(rendered => res.end(rendered))
}
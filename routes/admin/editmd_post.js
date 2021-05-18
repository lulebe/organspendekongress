const fs = require('fs').promises
const path = require('path')

const push = require.main.require('./sendpushs')

module.exports = async (req, res) => {
  if (req.body.md) {
    await fs.writeFile(path.join(global.appRoot, 'homepagetext.md'), req.body.md)
  }
  res.redirect('/admin/editmd')
  push('Auf der Website sind neue Infos verfügbar.')
}
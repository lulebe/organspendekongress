const fs = require('fs').promises
const path = require('path')

module.exports = async (req, res) => {
  if (req.body.md) {
    await fs.writeFile(path.join(global.appRoot, 'homepagetext.md'), req.body.md)
  }
  res.status(200).send()
}
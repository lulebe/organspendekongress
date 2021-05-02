const marked = require('marked')
const sanitize = require('sanitize-html')
const fs = require('fs').promises
const path = require('path')

const tmpl = require.main.require('./templates')
const settings = require.main.require('./settings')

module.exports = async (req, res) => {
  const md = await fs.readFile(path.join(global.appRoot, 'homepagetext.md'), 'utf-8')
  const opts = {
    markdownconvert: sanitize(marked(md)),
    workshopsopen: settings.get('workshopsopen')
  }
  tmpl.render('index.twig', opts).then(rendered => res.end(rendered))
}
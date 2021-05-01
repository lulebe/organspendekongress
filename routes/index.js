const marked = require('marked')
const sanitize = require('sanitize-html')
const fs = require('fs').promises
const path = require('path')

const tmpl = require.main.require('./templates')

module.exports = async (req, res) => {
  const md = await fs.readFile(path.join(global.appRoot, 'homepagetext.md'), 'utf-8')
  const opts = {
    markdownconvert: sanitize(marked(md))
  }
  tmpl.render('index.twig', opts).then(rendered => res.end(rendered))
}
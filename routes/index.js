const fs = require('fs').promises
const path = require('path')
const markdown = require('markdown-it')

const tmpl = require.main.require('./templates')
const settings = require.main.require('./settings')

const md = markdown()
md.use(require("markdown-it-anchor"))
md.use(require("markdown-it-table-of-contents"), {
  markerPattern: /^\[TOC\]/im,
  includeLevel: [1,2,3,4]
})
md.use(require('markdown-it-emoji'))
md.use(require('markdown-it-link-attributes'), {attrs: {target: '_blank'}})

md.renderer.rules.emoji = function(token, idx) {
  console.log(token)
  return '<img class="emoji" src="/assets/emojis/'+token[idx].markup+'.png">';
};

module.exports = async (req, res) => {
  const mdraw = await fs.readFile(path.join(global.appRoot, 'homepagetext.md'), 'utf-8')
  const opts = {
    markdownconvert: md.render(mdraw),
    workshopsopen: settings.get('workshopsopen')
  }
  tmpl.render('index.twig', opts).then(rendered => res.end(rendered))
}
const fs = require('fs').promises

module.exports = {init, get, set}

let settings = {}

async function init () {
  try {
    const settingsFile = await fs.readFile('./settings.json', 'utf-8')
    settings = JSON.parse(settingsFile)
  } catch (e) {
    settings = {
      workshopsopen: false
    }
    await fs.writeFile('./settings.json', JSON.stringify(settings))
  }
}

function get (key) {
  return settings[key]
}

function set (key, value) {
  settings[key] = value
  fs.writeFile('./settings.json', JSON.stringify(settings))
}
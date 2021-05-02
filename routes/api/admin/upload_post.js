const fs = require('fs').promises
const path = require('path')
const multer = require('multer')({dest: 'uploads/'})

const mw = []

module.exports = {route, mw}

async function route (req, res) {
  
  res.status(200).send()
}
const fs = require('fs').promises
const path = require('path')
const multer = require('multer')({dest: 'uploads/', limits: 50000000})

const mw = multer.array('editormd-image-file')


async function route (req, res) {
  const file = req.files[0]
  await fs.rename(file.path, file.path + path.extname(file.originalname))
  res.status(200).send({
    success: 1,
    message: 'file uploaded',
    url: '/uploads/' + file.filename  + path.extname(file.originalname)
  })
}

module.exports = {route, mw}
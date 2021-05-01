const router = require('express').Router()

module.exports = router

router.use((req, res, next) => {
  res.tmplOpts = {isLoggedIn: false}
  next()
})

router.get('/', require('./routes/index'))

async function adminHandler (req, res, next) {
  if (!req.session.loggedin) {
    return res.redirect('/')
  }
  res.tmplOpts.isLoggedIn = true
  next()
}
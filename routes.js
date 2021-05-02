const router = require('express').Router()
const bodyParser = require('body-parser').urlencoded({extended: true})

async function adminHandler (req, res, next) {
  if (!req.session.loggedin) {
    return res.redirect('/login')
  }
  res.tmplOpts.isLoggedIn = true
  next()
}

module.exports = router

router.use((req, res, next) => {
  res.tmplOpts = {isLoggedIn: false}
  next()
})

router.get('/', require('./routes/index'))
router.get('/registerworkshops', require('./routes/registerworkshops'))
router.post('/registerworkshops', [bodyParser], require('./routes/registerworkshops_post'))

router.get('/login', require('./routes/login'))
router.post('/login', [bodyParser], require('./routes/login_post'))

router.get('/admin', [adminHandler], require('./routes/admin/index'))
router.get('/admin/toggleworkshopsopen', [adminHandler], require('./routes/admin/toggleworkshopsopen'))
router.get('/admin/deleteworkshop', [adminHandler], require('./routes/admin/deleteworkshop'))
router.get('/admin/addworkshop', [adminHandler], require('./routes/admin/addworkshop'))
router.post('/admin/addworkshop', [adminHandler, bodyParser], require('./routes/admin/addworkshop_post'))

const fs = require('fs')
const path = require('path')

const session = require('express-session')
const app = require('express')()

const config = require('./config')
const settings = require('./settings')
const sessionStore = require('./db').sessionStore

global.appRoot = path.resolve(__dirname)

settings.init()

if (!fs.existsSync('./homepagetext.md'))
  fs.closeSync(fs.openSync('./homepagetext.md', 'w'))
if (!fs.existsSync('./uploads'))
  fs.mkdirSync('./uploads')

app.use(
  session({
    secret: config.COOKIE_SECRET,
    store: sessionStore,
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: { secure: 'auto' }
  })
)

app.use('/', require('./routes'))
app.use('/assets', require('express').static('./assets'))
app.use('/uploads', require('express').static('./uploads'))
app.use('/fonts', require('express').static('./fonts'))
app.get('/sw.js', (_, res) => res.sendFile(path.join(global.appRoot, 'assets/sw.js')))


app.listen(config.PORT, () => {
  console.log("AKO Server started on port", config.PORT)
})
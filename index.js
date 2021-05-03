const session = require('express-session')
const app = require('express')()

const config = require('./config')
const settings = require('./settings')
const sessionStore = require('./db').sessionStore

var path = require('path')
global.appRoot = path.resolve(__dirname)

settings.init()

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


app.listen(config.PORT, () => {
  console.log("AKO Server started on port", config.PORT)
})
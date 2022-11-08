if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')

const handlebarsHelperClass = require('./utilities/handlebarshelper')

const port = process.env.PORT
require('./config/mongoose')
const app = express()

const routes = require('./routes')

// 設定view engine
app.engine(
  'hbs',
  exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: handlebarsHelperClass,
  })
)
app.set('view engine', 'hbs')

// 設定session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      autoRemove: 'native', // cookie到期時預設TTL也到期，把expire的session移除
      mongoUrl: process.env.MONGODB_URI,
      touchAfter: 24 * 60 * 60, // session 一天更新一次
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie存活時間 7 天，7天後清除cookie及session
    },
  })
)

// 對request做前處理
app.use(express.urlencoded({ extended: true })) // 取得req.body內容
app.use(express.static('public')) // 靜態檔案
app.use(methodOverride('_method')) // 使用method-override改寫HTTP verb, 使其符合RESTful

// 使用passport驗證
usePassport(app)

// 取得session flash-message
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated() // 使用passport驗證後，就可以使用isAuthenticated和user
  res.locals.user = req.user
  res.locals.loginFailed_msg = req.flash('error_messages')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.isRegistered = req.flash('isRegistered')
  res.locals.edit_error_msg = req.flash('edit_error_msg')
  next()
})

// request送進路由
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

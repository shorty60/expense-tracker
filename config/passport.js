const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const User = require('../models/user')

module.exports = app => {
  // middleware
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定驗證策略
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email })
          if (!user) {
            return done(
              null,
              false,
              req.flash('error_messages', 'That email is not registered!')
            )
          }
          const isMatched = await bcrypt.compare(password, user.password)
          if (!isMatched) {
            return done(
              null,
              false,
              req.flash('error_messages', 'Email or password incorrect.')
            )
          }
          return done(null, user)
        } catch (err) {
          return done(err)
        }
      }
    )
  )
  // 使用者登入成功，將userId寫入session及client cookie
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  // 使用者帶著有user-id的cookie登入，deserialize拿到userId並去資料庫找資料
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
}

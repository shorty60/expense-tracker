const express = require('express')
const router = express.Router()

const passport = require('passport')

// 使用者按下facebook登入鈕，使用FB Oauth，請求FB給使用者email和公開檔案
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
)

// FB驗證使用者同意以及應用程式身分，把資料從callback link回傳後重新導向使用者
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)


router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)


router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

module.exports = router
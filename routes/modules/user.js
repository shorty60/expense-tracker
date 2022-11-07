const express = require('express')
const passport = require('passport')
const router = express.Router()

// 取得登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 使用者登入
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
)

router.post('/logout', async (req, res, next) => {
  await req.logout(err => {
    if (err) {
      return next(err)
    }
  })
  req.flash('success_msg', '你已成功登出')
  return res.redirect('/users/login')
})
module.exports = router

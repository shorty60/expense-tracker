const bcrypt = require('bcryptjs')
const express = require('express')
const passport = require('passport')
const router = express.Router()

const { validationResult } = require('express-validator')

const User = require('../../models/user')
const { userValidator } = require('../../middlewares/validation')
// 取得註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})
// 使用者註冊
router.post('/register', userValidator, async (req, res, next) => {
  let { name, email, password, confirmPassword } = req.body

  // 若使用者輸入不符合格式，response註冊頁面及錯誤訊息
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorsMsg = errors.array().map(err => err.msg)
    // 若驗證有錯誤，直接response給使用者with flash message
    return res.status(400).render('register', {
      name,
      email,
      password,
      confirmPassword,
      errorsMsg,
    })
  }

  if (!name) {
    name = 'Mr./Ms User'
  } // name如果沒有填寫，代入一個預設值，確保進入資料庫有名稱

  try {
    // 若使用者尚未註冊過，密碼加鹽後存入資料庫
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({ name, email, password: hash })

    return res.redirect('/')
  } catch (err) {
    next(err)
  }
})

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

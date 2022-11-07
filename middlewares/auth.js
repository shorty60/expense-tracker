module.exports = {
  authenticator: (req, res, next) => {
    // 使用者通過驗證才放行到下一個middleware
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用')
    res.redirect('/users/login') // 驗證失敗，導回登入頁面
  },
}

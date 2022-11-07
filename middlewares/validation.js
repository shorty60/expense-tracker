const { body, check } = require('express-validator')
const User = require('../models/user')


module.exports = {
  userValidator: [
    body('email').isEmail().trim().withMessage('請輸入email').bail().custom(async(email) => {
      const user = await User.findOne({email})
      if (user) {
        throw new Error('此email已經註冊過了')
      }
      return true
    }), // email必填
    body('password').not().isEmpty().trim().withMessage('請填寫密碼'), // 密碼必填
    body('confirmPassword')
      .not()
      .isEmpty()
      .trim()
      .withMessage('請確認密碼')
      .bail()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password')
        }
        // 如果通過客製化驗證，return true
        return true
      }),
  ],
}

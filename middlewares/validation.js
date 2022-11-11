const { body } = require('express-validator')
const User = require('../models/user')

module.exports = {
  expenseValidator: [
    body('name').not().isEmpty().trim().withMessage('請填寫支出名稱'),
    body('date').not().isEmpty().isDate().withMessage('請輸入日期'),
    body('categoryId').not().isEmpty().withMessage('請輸入種類'),
    body('amount').isInt({ gt: 0 }).withMessage('請輸入大於0的金額')
  ],

  userValidator: [
    body('email')
      .isEmail()
      .trim()
      .withMessage('請輸入email')
      .bail()
      .custom(async email => {
        const user = await User.findOne({ email })
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
      })
  ]
}

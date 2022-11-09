const express = require('express')
const assert = require('assert')
const moment = require('moment')
const Record = require('../../models/record')
const router = express.Router()

const { validationResult } = require('express-validator')
const getCategories = require('../../utilities/category') // 取得categories的function
const { expenseValidator } = require('../../middlewares/validation')

// 取得新增頁面
router.get('/new', async (req, res, next) => {
  try {
    const categories = await getCategories()
    return res.render('new', { categories })
  } catch (err) {
    next(err)
  }
})

// 新增一筆支出
router.post('/', expenseValidator, async (req, res, next) => {
  const userId = req.user._id
  let { name, date, categoryId, amount } = req.body

  try {
    const errors = validationResult(req) // 取得驗證不通過結果
    // 如果驗證有誤，顯示錯誤訊息給使用者
    if (!errors.isEmpty()) {
      const errorsMsg = errors.array().map(err => err.msg)
      const categories = await getCategories()
      assert(categories.length, new Error('Oops可能發生了些問題...請重新整理'))
      return res.status(400).render('new', {
        name,
        date,
        amount,
        categoryId,
        categories,
        errorsMsg,
      })
    }

    amount = Number(amount) // 透過req.body傳來的是字串，轉型成Number再寫入資料庫
    await Record.create({ name, date, amount, userId, categoryId })
    return res.redirect('/')
  } catch (err) {
    next(err)
  }
})

// 取得編輯頁面
router.get('/:id/edit', async (req, res, next) => {
  try {
    const userId = req.user._id
    const _id = req.params.id

    const record = await Record.findOne({ _id, userId }).lean()
    if (!record) {
      req.flash('warning_msg', '找不到這筆支出')
      return res.redirect('/')
    }

    const categories = await getCategories()
    assert(categories.length, Error('Oops可能發生了些問題...請重新整理')) // 確定有抓到種類資料
    record.date = moment(record.date).format('YYYY-MM-DD') // 整理日期格式

    return res.render('edit', { record, categories })
  } catch (err) {
    next(err)
  }
})

// 編輯一筆支出
router.put('/:id', expenseValidator, async (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id
  let { name, date, categoryId, amount } = req.body
  try {
    const errors = validationResult(req) // 取得驗證不通過結果
    // 如果驗證有誤，顯示錯誤訊息給使用者
    if (!errors.isEmpty()) {
      const errorsMsg = errors.array().map(err => err.msg)
      req.flash('edit_error_msg', errorsMsg)
      return res.status(400).redirect(`/records/${_id}/edit`)
    }

    // 驗證成功，更新資料庫資料
    amount = Number(amount)
    await Record.findOneAndUpdate(
      { _id, userId },
      { name, date, amount, userId, categoryId }
    )
    return res.redirect('/')
  } catch (err) {
    next(err)
  }

})

// 刪除一筆支出
router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    await Record.findOneAndDelete({ _id, userId })

    return res.redirect('/')
  } catch (err) {
    next(err)
  }
})

module.exports = router

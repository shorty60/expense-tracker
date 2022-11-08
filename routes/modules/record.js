const express = require('express')
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../models/category')
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
router.post('/', expenseValidator, (req, res, next) => {
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body

  const errors = validationResult(req) // 取得驗證不通過結果
  // 如果驗證有誤，顯示錯誤訊息給使用者
  if (!errors.isEmpty()) {
    const errorsMsg = errors.array().map(err => err.msg)
    getCategories().then(categories => {
      return res
        .status(400)
        .render('new', {
          name,
          date,
          amount,
          categoryId,
          categories,
          errorsMsg,
        })
    })
  } else {
    // 驗證成功，寫入一筆新的record進資料庫
    return Record.create({ name, date, amount, userId, categoryId })
      .then(() => res.redirect('/'))
      .catch(err => next(err))
  }
})

// 取得編輯頁面
router.get('/:id/edit', async (req, res, next) => {
  try {
    const userId = req.user._id
    const _id = req.params.id

    const record = await Record.findOne({ _id, userId }).lean()
    const categories = await getCategories()
    record.date = moment(record.date).format('YYYY-MM-DD') // 整理日期格式

    return res.render('edit', { record, categories })
  } catch (err) {
    next(err)
  }
})

// 編輯一筆支出
router.put('/:id', (req, res) => {
  console.log(req.body)
})

// 刪除一筆支出
router.delete('/:id', (req, res) => {})

module.exports = router

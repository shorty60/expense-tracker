const express = require('express')
const assert = require('assert')
const moment = require('moment')

const Record = require('../../models/record')
const { NoRecordsError } = require('../../errors/errortype')
const getCategories = require('../../utilities/category') // 取得categories的function

const router = express.Router()

// 瀏覽所有支出 => index page
router.get('/', async (req, res, next) => {
  const userId = req.user._id
  try {
    const records = await Record.find({ userId }).lean()
    // 若使用者尚未有新增支出，return message
    assert(
      records.length,
      new NoRecordsError('目前還沒有支出明細，快來新增第一筆吧')
    )
    const categories = await getCategories() // 取得種類資料

    let totalAmount = 0
    records.forEach(record => {
      totalAmount += record.amount
      record.date = moment(record.date).format('YYYY-MM-DD')
      categories.forEach(category => {
        if (record.categoryId.toString() === category._id.toString()) {
          record['icon'] = category.icon // 新增key-value pairs
        }
      })
    })

    return res.render('index', { records, totalAmount })
  } catch (err) {
    next(err)
  }
})

module.exports = router

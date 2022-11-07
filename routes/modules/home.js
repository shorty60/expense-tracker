const express = require('express')
const assert = require('assert')
const router = express.Router()
const Record = require('../../models/record')
const moment = require('moment')
const { NoRecordsError } = require('../../errors/errortype')

const CATEGORY = {
  家居物業: 'https://fontawesome.com/icons/home?style=solid',
  交通出行: 'https://fontawesome.com/icons/shuttle-van?style=solid',
  休閒娛樂: 'https://fontawesome.com/icons/grin-beam?style=solid',
  餐飲食品: 'https://fontawesome.com/icons/utensils?style=solid',
  其他: 'https://fontawesome.com/icons/pen?style=solid',
}

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

    let totalAmount = 0
    records.forEach(record => {
      totalAmount += record.amount
      record.date = moment(record.date).format('YYYY-MM-DD')
    })
    return res.render('index', { records, totalAmount })
  } catch (err) {
    next(err)
  }
})

module.exports = router

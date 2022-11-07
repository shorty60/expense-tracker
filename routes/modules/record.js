const express = require('express')
const Record = require('../../models/record')
const router = express.Router()

// 取得新增頁面
router.get('/new', (req, res) => {
})

// 新增一筆支出
router.post('/', (req, res) => {})

// 取得編輯頁面 
router.get('/:id/edit', (req, res) => {})

// 編輯一筆支出
router.put('/:id', (req, res) => {

})

// 刪除一筆支出
router.delete('/:id', (req, res) => {

})


module.exports = router

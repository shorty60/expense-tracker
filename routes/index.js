const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const users = require('./modules/user')
const records = require('./modules/record')

const { authenticator } = require('../middlewares/auth')

router.use('/users', users)
router.use('/records', authenticator, records)
router.use('/', authenticator, home)

router.use('*', (req, res) => {
  res.status(404).send('404 not found')
})
router.use((err, req, res, next) => {
  if (err instanceof NoRecordsError){
    const notFoundRecord = err.msg
    return res.render('index', { notFoundRecord })
  } 
  res.status(500).send('500 error')
})

module.exports = router

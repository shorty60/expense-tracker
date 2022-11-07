const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const user = require('./modules/user')

const { authenticator } = require('../middlewares/auth')

router.use('/users', user)
router.use('/', authenticator, home)

router.use('*', (req, res) => {
  res.status(404).send('404 not found')
})
router.use((err, req, res, next) => {
  res.status(500).send('500 error')
})
module.exports = router

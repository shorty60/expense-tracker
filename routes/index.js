const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const user = require('./modules/user')

const { authenticator } = require('../middlewares/auth')

router.use('/users', user)
router.use('/', authenticator, home)

module.exports = router

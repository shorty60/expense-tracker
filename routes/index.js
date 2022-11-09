const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const users = require('./modules/user')
const records = require('./modules/record')
const auth = require('./modules/auth')

const { authenticator } = require('../middlewares/auth')
const { NoRecordsError } = require('../errors/errortype')
const getCategories = require('../utilities/category')

router.use('/auth', auth)
router.use('/users', users)
router.use('/records', authenticator, records)
router.use('/', authenticator, home)

router.use('*', (req, res) => {
  res.status(404).render('notfound404')
})

router.use(async (err, req, res, next) => {
  if (err instanceof NoRecordsError) {
    const notFoundRecord = err.message
    const categories = await getCategories()
    return res.render('index', { notFoundRecord, categories })
  }
  const serverErrorMsg = err.message
  console.log(serverErrorMsg) // check error message in log
  return res.status(500).render('error500')
})

module.exports = router

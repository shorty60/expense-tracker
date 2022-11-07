// Import mongoDB URI
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Include seeds data
const categories = require('../seeds/categories.json').results
// Include Category model
const Category = require('../category')
// connect to DB
const db = require('../../config/mongoose')

// when db connected, writting seeds
db.once('open', async () => {
  console.log('Start writing category seeds...')
  try {
    await Promise.all(
      categories.map(async category => {
        const { name } = category // extracted name from each category
        await Category.create({ name })
      })
    )
    console.log('Categories seeds written.')
    db.close()
  } catch (err) {
    console.log(err)
  } finally {
    process.exit()
  }
})

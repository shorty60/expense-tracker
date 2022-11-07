// Import mongoDB URI
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
// Include seeds data
const users = require('../seeds/users.json').users
const records = require('../seeds/records.json').results

// Include User and Record model
const User = require('../user')
const Record = require('../record')
const Category = require('../category')

// connect to DB
const db = require('../../config/mongoose')

db.once('open', async () => {
  console.log('Start writing users and records seeds.')
  // 寫入user資料
  try {
    // get categories
    const categories = await Category.find().lean()

    await Promise.all(
      users.map(async user => {
        const { name, email, password, recordIndex } = user

        // 等待user寫入資料庫 => 密碼須等帶hash完才將整個user的資料寫入資料庫
        const userCreated = await User.create({
          name,
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        })
        // 整理records資料
        const recordsData = recordIndex.map(index => {
          const record = records[index]
          const categoryData = categories.find(
            item => record.category === item.name
          )
          record.categoryId = categoryData._id
          record.userId = userCreated._id
          delete record['category']
          return record // map function 每個element的return value
        })

        // 等待寫入record資料
        await Record.insertMany(recordsData)
      })
    )
    // 確保所有user和record資料都寫完，關閉資料庫
    console.log(
      'All users and record seeds written! Please type [npm run start] to run this project.'
    )
    db.close()
  } catch (err) {
    console.log(
      'Something error, please check error msg below and try [npm run seed] again.', err
    )
  } finally {
    process.exit()
  }
})

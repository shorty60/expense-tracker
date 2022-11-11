async function getCategories() {
  const Category = require('../models/category')
  try {
    const categories = await Category.find().lean()
    //取得icon加入陣列
    const CATEGORY = {
      家居物業: '<i class="fa-solid fa-house"></i>',
      交通出行: '<i class="fa-solid fa-van-shuttle"></i>',
      休閒娛樂: '<i class="fa-solid fa-face-grin-beam"></i>',
      餐飲食品: '<i class="fa-solid fa-utensils"></i>',
      其他: '<i class="fa-solid fa-pen"></i>',
    }
    
    const categoriesWithIcons = categories.map(category => {
       for (const [key, value] of Object.entries(CATEGORY)) {
         if (key === category.name) {
           category.icon = value
         }
       }
       return category
    })
    
    return categoriesWithIcons
  } catch (err) {
    throw new Error('MongoDB error')
  }
}

module.exports = getCategories

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const port = process.env.PORT

require('./config/mongoose')

const app = express()

app.get('/', (req, res) => {
  res.send('index')
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

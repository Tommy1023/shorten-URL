const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')


app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

mongoose.connect('mongodb://localhost/shorten-url')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})



app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ShortenUrl = require('./models/shortenUrl')
const generateShortUrl = require('./generate_shortenUrl') 


app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')
app.use(bodyParser.urlencoded({extended: true}))

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

app.post('/', (req, res) => {
  const inputUrl = req.body.originUrl
  const urlId = generateShortUrl()

  ShortenUrl.findOne({originUrl: inputUrl})
    .then(data => data ? data : ShortenUrl.create({ originUrl: inputUrl, shortenUrl: urlId }))
    .then(data => 
      res.render('show', { origin: req.headers.origin, shortenId: data.shortenUrl})
    )
    .catch(error => {
      console.log(error)
      res.render('errorPage', { status: 500, error: error.message })
    })
    
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
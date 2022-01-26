const mongoose = require('mongoose')
const ShortenUrl = require('../shortenUrl')

mongoose.connect('mongodb://localhost/shorten-url')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoose error!')
})

db.once('open', () => {
  console.log('mongoose connected!')

  for(let i = 1; i < 6; i++) {
    ShortenUrl.create({shortenUrl: i, originUrl: 'http://test/' + i})
  }

  console.log('done')
})
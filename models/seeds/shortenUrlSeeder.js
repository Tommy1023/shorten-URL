const db = require('../../config/mongoose')
const ShortenUrl = require('../shortenUrl')
const generateShortUrl = require('../../public/javascripts/generate_shortenUrl')

db.once('open', () => {
  console.log('mongoose connected!')

  for(let i = 1; i < 10; i++) {
    let shortenId = generateShortUrl()
    ShortenUrl.create({shortenUrl: shortenId, originUrl: 'http://test/' + i})
  }

  console.log('done')
})
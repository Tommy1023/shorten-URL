const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortenUlrSchema = new Schema({
  originUrl: {
    type: URL,
    required: true
  },
  shortenUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('ShortenUrl', shortenUlrSchema)
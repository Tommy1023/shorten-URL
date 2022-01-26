const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCaseLetters = upperCaseLetters.toLowerCase()
const numbers = '1234567890'
let collection = []
const used = []

function generateShortUrl(){
  let shortUrl = randomUrl()
  while (used.includes(shortUrl)) {
    shortUrl = randomUrl()
  }
  used.push(shortUrl)
  return shortUrl
}

function randomUrl() {
  collection = collection.concat(upperCaseLetters.split(''), lowerCaseLetters.split(''), numbers.split(''))
  let randomCode = ''
  for (let i = 0; i < 1; i++) {
    randomCode += sample(collection)
  }
  return randomCode  
}

function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

module.exports = generateShortUrl
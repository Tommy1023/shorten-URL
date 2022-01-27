const express = require('express')
const router = express.Router()
const ShortenUrl = require('../../models/shortenUrl')
const generateShortUrl = require('../../public/javascripts/generate_shortenUrl')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const inputUrl = req.body.originUrl
  const urlId = generateShortUrl()

  ShortenUrl.findOne({ originUrl: inputUrl })
    .then(data => data ? data : ShortenUrl.create({ originUrl: inputUrl, shortenUrl: urlId }))
    .then(data =>
      res.render('show', { origin: req.headers.origin, shortenId: data.shortenUrl })
    )
    .catch(error => {
      console.log(error)
      res.render('errorPage', { status: 500, error: error.message })
    })

})

router.get('/:id', (req, res) => {
  const urlId = req.params.id
  ShortenUrl.findOne({ shortenUrl: urlId })
    .then(data => {
      res.redirect(data.originUrl)
    })
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
  }
)

module.exports = router
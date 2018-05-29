var mongoose = require('mongoose'),
    router = require('express').Router()
var auth = require('../auth')
var Company = mongoose.model('Company')

// Get Tags
router.get('/', auth.required, (req, res, next) => {
  Company.find({ author: req.payload.id }).distinct('tagList').then((tags) => {
    return res.json({ tags: tags })
  }).catch(next)
})

module.exports = router

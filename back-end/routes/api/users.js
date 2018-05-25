var mongoose = require('mongoose'),
    passport = require('passport'),
    router = require('express').Router()
var auth = require('../auth')
var User = mongoose.model('User')

// Registration
router.post('/users', (req, res, next) => {
  var user = new User()

  user.username = req.body.user.username
  user.setPassword(req.body.user.password)

  user.save().then(() => {
    return res.json({
      user: user.toAuthJSON()
    })
  }).catch(next)
})

module.exports = router

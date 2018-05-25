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

// Authentication
router.post('/users/login', (req, res, next) => {
  if(!req.body.user.username){
    return res.status(422).json({ errors: { username: "can't be blank" } })
  }

  if(!req.body.user.password){
    return res.status(422).json({ errors: { password: "can't be blank" } })
  }

  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('info:', info)
    if(err){ return next(err) }

    if(user){
      return res.json({ user: user.toAuthJSON })
    }else{
      return res.status(422).json(info)
    }

    // possible delete for the else clause
  })(req, res, next)
})

module.exports = router

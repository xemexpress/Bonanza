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
    return res.json({ user: user.toAuthJSON() })
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
    if(err){ return next(err) }

    if(user){
      return res.json({ user: user.toAuthJSON() })
    }else{
      return res.status(422).json(info)
    }
  })(req, res, next)
})

// Get Current User
router.get('/user', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if(!user){ return res.sendStatus(401) }

    return res.json({ user: user.toAuthJSON() })
  }).catch(next)
})

// Update User
router.put('/user', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if(!user){ return res.sendStatus(401) }

    if(typeof req.body.user.username !== 'undefined' && req.payload.username !== auth.admin){
      user.username = req.body.user.username
    }

    if(typeof req.body.user.proPic !== 'undefined'){
      user.proPic = req.body.user.proPic
    }

    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password)
    }

    return user.save().then(() => {
      res.json({ user: user.toAuthJSON() })
    })
  }).catch(next)
})

module.exports = router

var mongoose = require('mongoose'),
    router = require('express').Router()
var auth = require('../auth')
var User = mongoose.model('User')

// List Users
router.get('/users', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    User.find({}).then((users) => {
      return res.json({
        users: users.map((user) => {
          return user.toProfileJSON()
        }),
        usersCount: users.length
      })
    }).catch(next)
  }else{
    return res.status(403).json({ errors: { 'admin': 'is invalid' } })
  }
})

// Delete User
router.delete('/users', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    if(Array.isArray(req.body.users)){
      req.body.users.forEach((username) => {
        User.find({ username: username }).remove().exec()
      })
    }

    return res.sendStatus(204)
  }else{
    return res.status(403).json({ errors: { 'admin': 'is invalid' } })
  }
})
module.exports = router

var mongoose = require('mongoose'),
    router = require('express').Router()
var auth = require('../auth')
var User = mongoose.model('User'),
    Company = mongoose.model('Company')

// List Users
router.get('/users', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    User.find({}).then((users) => {
      return res.json({
        users: users.map((user) => {
          return user.toAdminJSON()
        }),
        usersCount: users.length
      })
    }).catch(next)
  }else{
    return res.status(403).json({ errors: { 'admin': 'is invalid' } })
  }
})

// Delete Users
router.delete('/users', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    if(Array.isArray(req.body.users)){
      User.remove({ username: { $in: req.body.users } }).then(() => {
        return res.sendStatus(204)
      })
    }else{
      return res.status(422).json({ errors: { 'users': 'should be an array' } })
    }
  }else{
    return res.status(403).json({ errors: { 'admin': 'is invalid' } })
  }
})

// List Companies
router.get('/companies', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    Company.find({})
      .populate('author', 'username')
      .then((companies) => {
        return res.json({
          companies: companies.map((company) => {
            return company.toAdminJSON()
          }),
          companiesCount: companies.length
        })
      }).catch(next)
  }else{
    return res.status(403).json({ errors: { 'admin': 'is invalid' } })
  }
})

// Delete Companies
router.delete('/companies', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    if(typeof req.body.companies.author !== 'undefined'){
      User.findOne({ username: req.body.companies.author }).then((user) => {
        if(!user){ return res.sendStatus(401) }
        let targetId = user._id
        Company.remove({
          author: targetId,
          symbol: { $in: req.body.companies.symbols }
        }).then(() => {
          return res.sendStatus(204)
        })
      }).catch(next)
    }else{
      return res.status(422).json({ errors: { 'author': "can't be blank" } })
    }
  }else{
    return res.status(403).json({ errors: { 'admin': 'is invalid' } })
  }
})

module.exports = router

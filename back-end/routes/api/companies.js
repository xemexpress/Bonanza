var mongoose = require('mongoose'),
    router = require('express').Router()
var auth = require('../auth')
var Company = mongoose.model('Company')
var User = mongoose.model('User')

// Preload Company's symbol
router.param('symbol', (req, res, next, symbol) => {
  req.symbol = symbol

  next()
})

// Create Company
router.post('/', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if(!user){ return res.sendStatus(401) }

    // Should check if user already has the symbol.
    if(true){
      var company = new Company(req.body.company)
    
      company.author = user

      return company.save().then(() => {
        return res.json({ company: company.toJSONFor() })
      })
    }else{
      return res.status(422).json({ errors: { 'company with the same symbol': 'already exists' } })
    }
  }).catch(next)
})

// Update Company
router.put('/:symbol', auth.required, (req, res, next) => {
  Company.findOne({ author: req.payload.id, symbol: req.symbol }).then((company) => {
    if(!company){ return res.sendStatus(401) }

    if(typeof req.body.company.symbol !== 'undefined'){
      company.symbol = req.body.company.symbol
    }

    if(typeof req.body.company.name !== 'undefined'){
      company.name = req.body.company.name
    }

    if(typeof req.body.company.abbr !== 'undefined'){
      company.abbr = req.body.company.abbr
    }

    if(typeof req.body.company.logo !== 'undefined'){
      company.logo = req.body.company.logo
    }

    if(typeof req.body.company.tagList !== 'undefined'){
      company.tagList = req.body.company.tagList
    }

    return company.save().then(() => {
      return res.json({ company: company.toJSONFor() })
    })
  }).catch(next)
})

// Delete Company
router.delete('/:symbol', auth.required, (req, res, next) => {
  Company.remove({ author: req.payload.id, symbol: req.symbol }).then((deleted, err, what) => {
    return res.sendStatus(204)
  })
})

module.exports = router

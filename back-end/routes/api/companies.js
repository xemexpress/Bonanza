var mongoose = require('mongoose'),
    router = require('express').Router()
var auth = require('../auth')
var User = mongoose.model('User'),
    Company = mongoose.model('Company'),
    Record = mongoose.model('Record')

// Preload Company's symbol
router.param('symbol', (req, res, next, symbol) => {
  req.symbol = symbol

  next()
})

// Preload Record's year
router.param('year', (req, res, next, year) => {
  req.year = year

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

// Get Records from a Company
router.get('/:symbol/records', auth.required, (req, res, next) => {
  Company.findOne({ author: req.payload.id, symbol: req.symbol })
    .populate({
      path: 'records',
      options: {
        sort: { year: 1 }
      }
    })
    .then((company) => {
      if(!company){ return res.sendStatus(401) }
      
      return res.json({
        records: company.records.map((record) => {
          return record.toJSONFor()
        }),
        recordsCount: company.records.length
      })
    }).catch(next)
})

// Add Record to a Company
router.post('/:symbol/records', auth.required, (req, res, next) => {
  Company.findOne({ author: req.payload.id, symbol: req.symbol })
    .populate('records', 'year')
    .then((company) => {
      if(!company){ return res.sendStatus(401) }
      console.log('records:',company.records)
      if(company.records.every((record) => record.year !== req.body.record.year)){
        var record = new Record(req.body.record)
        record.forCompany = company

        return record.save().then(() => {
          company.records.push(record)

          return company.save().then(() => {
            return res.json({ record: record.toJSONFor() })
          })
        })
      }else{
        return res.status(422).json({ errors: { 'year': "can't be repeated" } })
      }
    }).catch(next)
})

// Delete Record
router.delete('/:symbol/records/:year', auth.required, (req, res, next) => {
  Company.findOne({ author: req.payload.id, symbol: req.symbol })
    .populate('records', 'year')
    .then((company) => {
      if(!company){ return res.sendStatus(401) }
      
      let recordId = company.records.find((record) => record.year === req.year)._id
      company.records.remove(recordId)
      company.save().then(() => {
        Record.remove({ _id: recordId }).then(() => {
          return res.sendStatus(204)
        })
      })
    }).catch(next)
})

module.exports = router

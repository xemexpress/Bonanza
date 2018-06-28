var mongoose = require('mongoose'),
    router = require('express').Router()
var auth = require('../auth')
var User = mongoose.model('User'),
    Company = mongoose.model('Company'),
    Record = mongoose.model('Record')

// List Companies
router.get('/', auth.required, (req, res, next) => {
  let query = { author: req.payload.id }
  let limit = 24
  let offset = 0

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset
  }

  if(typeof req.query.tag !== 'undefined'){
    query.tagList = { $in: [req.query.tag]}
  }

  if(typeof req.query.companyName !== 'undefined'){
    query.name = {
      $regex: req.query.companyName,
      $options: "i"
    }
  }

  Promise.all([
    Company.find(query)
      .skip(Number(offset))
      .limit(Number(limit))
      .sort({ createdAt: -1 }),
    Company.count(query)
  ]).then(results => {
    let companies = results[0]
    let companiesCount = results[1]

    return res.json({
      companies: companies.map(company => {
        return company.toJSONFor()
      }),
      companiesCount: companiesCount
    })
  }).catch(next)
})

// Create Company
router.post('/', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then(user => {
    if(!user){ return res.sendStatus(401) }

    // Should check if user already has the symbol.
    Company.find({ author: req.payload.id, symbol: req.body.company.symbol }).limit(1).then(companyResult => {
      let symbolAlreadyExists = companyResult[0]
      if(!symbolAlreadyExists){
        var company = new Company(req.body.company)
        
        company.author = user

        return company.save().then(() => {
          return res.json({ company: company.toJSONFor() })
        })
      }
      else{
        return res.status(422).json({ errors: { 'company with the same symbol': 'already exists' } })
      }
    }).catch(next)
  }).catch(next)
})

// Retrieve Company
router.get('/:symbol', auth.required, (req, res, next) => {
  Company.find({ author: req.payload.id, symbol: req.params.symbol }).limit(1).then(companyResult => {
    let company = companyResult[0]
    if(!company){ return res.sendStatus(401) }

    return res.json({ company: company.toJSONFor() })
  }).catch(next)
})

// Update Company
router.put('/:symbol', auth.required, (req, res, next) => {
  Promise.all([
    Company.find({ author: req.payload.id, symbol: req.params.symbol }).limit(1),
    req.body.company.symbol ? Company.find({ author: req.payload.id, symbol: req.body.company.symbol }).limit(1) : null
  ]).then(results => {
    let company = results[0] ? results[0][0] : null
    let symbolAlreadyExists = results[1] ? results[1][0] : null

    if(!company){ return res.sendStatus(401) }
    
    if(typeof req.body.company.symbol !== 'undefined'){
      if(symbolAlreadyExists){ return res.status(422).json({ errors: { 'company with the same symbol': 'already exists' } }) }

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

    if(typeof req.body.company.link !== 'undefined'){
      company.link = req.body.company.link
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
  Company.findOneAndRemove({ author: req.payload.id, symbol: req.params.symbol }).then(company => {
    if(!company){ return res.sendStatus(401) }
    
    return Record.remove({ company: company._id }).then(() => {
      return res.sendStatus(204)
    })
  }).catch(next)
})

// Get Records from a Company
router.get('/:symbol/records', auth.required, (req, res, next) => {
  Company.find({ author: req.payload.id, symbol: req.params.symbol }).limit(1)
    .populate({
      path: 'records',
      options: {
        sort: { year: 1 }
      }
    })
    .then(companyResult => {
      let company = companyResult[0]
      if(!company){ return res.sendStatus(401) }
      
      return res.json({
        records: company.records.map(record => {
          return record.toJSONFor()
        }),
        recordsCount: company.records.length
      })
    }).catch(next)
})

// Add Record to a Company
router.post('/:symbol/records', auth.required, (req, res, next) => {
  zaCompanyByAuthorSymbolWithRecordsYearPopulated(req.payload.id, req.params.symbol).then(companyResult => {
    let company = companyResult[0]

    if(!company){ return res.sendStatus(401) }
    
    if(company.records.every(record => record.year !== req.body.record.year)){
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

// Update Record
router.put('/:symbol/records/:year', auth.required, (req, res, next) => {
  zaCompanyByAuthorSymbolWithRecordsYearPopulated(req.payload.id, req.params.symbol).then(companyResult => {
    let company = companyResult[0]

    if(!company){ return res.sendStatus(401) }

    zaRecordFromCompanyByYear(company, req.params.year).then(record => {
      if(!record){ return res.sendStatus(401) }
      
      if(typeof req.body.record.year !== 'undefined'){
        record.year = req.body.record.year
      }

      if(typeof req.body.record.keyList !== 'undefined'){
        record.keyList = req.body.record.keyList
      }

      if(typeof req.body.record.businessSegments !== 'undefined'){
        record.businessSegments = req.body.record.businessSegments
      }

      if(typeof req.body.record.grossProfitMargin !== 'undefined'){
        record.grossProfitMargin = req.body.record.grossProfitMargin
      }

      if(typeof req.body.record.plans !== 'undefined'){
        record.plans = req.body.record.plans
      }

      if(typeof req.body.record.actionsDone !== 'undefined'){
        record.actionsDone = req.body.record.actionsDone
      }

      return record.save().then(() => {
        return res.json({ record: record.toJSONFor() })
      })
    }).catch(next)
  }).catch(next)
})

// Delete Record
router.delete('/:symbol/records/:year', auth.required, (req, res, next) => {
  zaCompanyByAuthorSymbolWithRecordsYearPopulated(req.payload.id, req.params.symbol).then(companyResult => {
    let company = companyResult[0]
    if(!company){ return res.sendStatus(401) }
    
    let targetRecord = company.records.find(record => record.year === req.params.year)
    if(!targetRecord){ return res.sendStatus(401) }

    let recordId = targetRecord._id
    company.records.remove(recordId)
    company.save().then(() => {
      Record.remove({ _id: recordId }).then(() => {
        return res.sendStatus(204)
      })
    })
  }).catch(next)
})

module.exports = router

function zaCompanyByAuthorSymbolWithRecordsYearPopulated(userId, companySymbol){
  return Company.find({ author: userId, symbol: companySymbol }).limit(1)
                .populate('records', 'year')
}

function zaRecordFromCompanyByYear(company, year){
  let recordId = company.records.find(record => record.year === year)._id

  return Record.findById(recordId)
}

var mongoose = require('mongoose'),
    router = require('express').Router()
var auth = require('../auth')
var User = mongoose.model('User'),
    Company = mongoose.model('Company'),
    Record = mongoose.model('Record'),
    Financial = mongoose.model('Financial')

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
    query.tagList = { $in: req.query.tag.split(',') }
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
    
    return Promise.all([
      Record.deleteMany({ _id: { $in: company.records } }),
      Financial.deleteMany({ _id: { $in: company.financials } })
    ]).then(() => res.sendStatus(204))
  }).catch(next)
})

// Get Records from Company
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

// Add Record to Company
router.post('/:symbol/records', auth.required, (req, res, next) => {
  zaCompanyPopulatedSearch(req.payload.id, req.params.symbol, ['records', 'year']).then(companyResult => {
    let company = companyResult[0]

    if(!company){ return res.sendStatus(401) }
    
    if(company.records.every(record => record.year !== req.body.record.year)){
      var record = new Record(req.body.record)

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
  zaCompanyPopulatedSearch(req.payload.id, req.params.symbol, ['records', 'year']).then(companyResult => {
    let company = companyResult[0]

    if(!company){ return res.sendStatus(401) }

    zaDetailCat(company, 'record', req.params.year).then(record => {
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
  zaCompanyPopulatedSearch(req.payload.id, req.params.symbol, ['records', 'year']).then(companyResult => {
    let company = companyResult[0]
    if(!company){ return res.sendStatus(401) }
    
    let targetRecord = company.records.find(record => record.year === req.params.year)
    if(!targetRecord){ return res.sendStatus(401) }

    let recordId = targetRecord._id
    company.records.deleteMany(recordId)
    
    return company.save().then(() => {
      Record.deleteMany({ _id: recordId }).then(() => {
        return res.sendStatus(204)
      })
    })
  }).catch(next)
})

// Get Financials from Company
router.get('/:symbol/financials', auth.required, (req, res, next) => {
  Company.find({ author: req.payload.id, symbol: req.params.symbol }).limit(1)
    .populate({
      path: 'financials',
      options: {
        sort: { year: 1 }
      }
    })
    .then(companyResult => {
      let company = companyResult[0]
      if(!company){ return res.sendStatus(401) }
      
      return res.json({
        financials: company.financials.map(financial => {
          return financial.toJSONFor()
        }),
        financialsCount: company.financials.length
      })
    }).catch(next)
})

// Add Financial to Company
router.post('/:symbol/financials', auth.required, (req, res, next) => {
  zaCompanyPopulatedSearch(req.payload.id, req.params.symbol, ['financials', 'year']).then(companyResult => {
    let company = companyResult[0]

    if(!company){ return res.sendStatus(401) }
    
    if(company.financials.every(financial => financial.year !== req.body.financial.year)){
      var financial = new Financial(req.body.financial)

      return financial.save().then(() => {
        company.financials.push(financial)

        return company.save().then(() => {
          return res.json({ financial: financial.toJSONFor() })
        })
      })
    }else{
      return res.status(422).json({ errors: { 'year': "can't be repeated" } })
    }
  }).catch(next)
})

// Update Financial
router.put('/:symbol/financials/:year', auth.required, (req, res, next) => {
  zaCompanyPopulatedSearch(req.payload.id, req.params.symbol, ['financials', 'year']).then(companyResult => {
    let company = companyResult[0]

    if(!company){ return res.sendStatus(401) }
    
    zaDetailCat(company, 'financial', req.params.year).then(financial => {
      if(!financial){ return res.sendStatus(401) }
      
      if(typeof req.body.financial.year !== 'undefined'){
        financial.year = req.body.financial.year
      }

      if(typeof req.body.financial.currency !== 'undefined'){
        financial.currency = req.body.financial.currency
      }

      if(typeof req.body.financial.sharesOutstanding !== 'undefined'){
        financial.sharesOutstanding = req.body.financial.sharesOutstanding
      }

      if(typeof req.body.financial.resonance !== 'undefined'){
        financial.resonance = req.body.financial.resonance
      }

      if(typeof req.body.financial.position !== 'undefined'){
        if(typeof req.body.financial.position.totalAssets !== 'undefined'){
          financial.position.totalAssets = req.body.financial.position.totalAssets
        }

        if(typeof req.body.financial.position.totalLiabilities !== 'undefined'){
          financial.position.totalLiabilities = req.body.financial.position.totalLiabilities
        }

        if(typeof req.body.financial.position.currentAssets !== 'undefined'){
          financial.position.currentAssets = req.body.financial.position.currentAssets
        }

        if(typeof req.body.financial.position.currentLiabilities !== 'undefined'){
          financial.position.currentLiabilities = req.body.financial.position.currentLiabilities
        }

        if(typeof req.body.financial.position.nonCurrentAssets !== 'undefined'){
          financial.position.nonCurrentAssets = req.body.financial.position.nonCurrentAssets
        }

        if(typeof req.body.financial.position.nonCurrentLiabilities !== 'undefined'){
          financial.position.nonCurrentLiabilities = req.body.financial.position.nonCurrentLiabilities
        }
      }

      if(typeof req.body.financial.cashFlow !== 'undefined'){
        financial.cashFlow = req.body.financial.cashFlow
      }

      return financial.save().then(() => {
        return res.json({ financial: financial.toJSONFor() })
      })
    }).catch(next)
  }).catch(next)
})

// Delete Financial
router.delete('/:symbol/financials/:year', auth.required, (req, res, next) => {
  zaCompanyPopulatedSearch(req.payload.id, req.params.symbol, ['financials', 'year']).then(companyResult => {
    let company = companyResult[0]
    if(!company){ return res.sendStatus(401) }
    
    let financial = company.financials.find(financial => financial.year === req.params.year)
    if(!financial){ return res.sendStatus(401) }

    let financialId = target._id
    company.financials.deleteMany(financialId)
    
    return company.save().then(() => {
      Financial.deleteMany({ _id: financialId }).then(() => {
        return res.sendStatus(204)
      })
    })
  }).catch(next)
})

// Delete all Financials from Company
router.delete('/:symbol/financials', auth.required, (req, res, next) => {
  zaCompanyPopulatedSearch(req.payload.id, req.params.symbol, []).then(companyResult => {
    let company = companyResult[0]
    if(!company){ return res.sendStatus(401) }
    
    Financial.deleteMany({ _id: { $in: company.financials } }).then(() => {
      company.financials = []

      return company.save().then(() => res.sendStatus(204))
    })
  }).catch(next)
})

module.exports = router

function zaCompanyPopulatedSearch(userId, companySymbol, props){
  return Company.find({ author: userId, symbol: companySymbol }).limit(1)
                .populate(...props)
}

function zaDetailCat(company, category, year){
  if(category === 'record'){
    let recordId = company.records.find(record => record.year === year)._id

    return Record.findById(recordId)
  }else if(category === 'financial'){
    let financialId = company.financials.find(financial => financial.year === year)._id

    return Financial.findById(financialId)
  }
}

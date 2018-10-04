var mongoose = require('mongoose'),
    router = require('express').Router()
var auth = require('../auth')
var User = mongoose.model('User'),
    Company = mongoose.model('Company'),
    Record = mongoose.model('Record'),
    Financial = mongoose.model('Financial'),
    Article = mongoose.model('Article')

// List Users
router.get('/users', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    User.find({}).then(users => {
      return res.json({
        users: users.map(user => {
          return user.toJSONFor()
        }),
        usersCount: users.length
      })
    }).catch(next)
  }else{
    return res.sendStatus(403)
  }
})

// Delete User
router.delete('/user', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    User.findOneAndRemove({ username: req.body.user }).then(user => {
      if(!user){ return res.sendStatus(401) }

      Company.find({ author: user._id }).then(companies => {
        if(companies.length){
          companyIds = companies.map(company => company._id)
          recordIds = companies.map(company => company.records).flat()
          financialIds = companies.map(company => company.financials).flat()

          return Promise.all([
            Company.remove({ _id: { $in: companyIds } }),
            Record.remove({ _id: { $in: recordIds } }),
            Financial.remove({ _id: { $in: financialIds } })
          ]).then(() => res.sendStatus(204))
        }

        return res.sendStatus(204)
      })
    }).catch(next)
  }else{
    return res.sendStatus(403)
  }
})

// List Companies
router.get('/companies', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    let query = {}
    let limit = 24
    let offset = 0

    if(typeof req.query.tag !== 'undefined'){
      query.tagList = { $in: [req.query.tag] }
    }

    if(typeof req.query.limit !== 'undefined'){
      limit = req.query.limit
    }

    if(typeof req.query.offset !== 'undefined'){
      offset = req.query.offset
    }

    Promise.all([
      req.query.author ? User.find({ username: { $in: [req.query.author] } }).limit(1) : null
    ]).then(results => {
      
      let user = results[0] ? results[0][0] : null
      if(user){
        query.author = user._id
      }

      Promise.all([
        Company.find(query)
          .skip(Number(offset))
          .limit(Number(limit))
          .sort({ createdAt: -1 })
          .populate('author', 'username proPic')
          .populate({
            path: 'records',
            select: 'year',
            options: {
              sort: {
                year: 1
              }
            }
          }),
        Company.count(query)
      ]).then(results => {
        let companies = results[0]
        let companiesCount = results[1]

        return res.json({
          companies: companies.map(company => {
            return company.toJSONForAdmin()
          }),
          companiesCount: companiesCount
        })
      }).catch(next)
    })
  }else{
    return res.sendStatus(403)
  }
})

// Delete Companies
router.delete('/companies', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    if(typeof req.body.companies.author !== 'undefined'){
      User.find({ username: req.body.companies.author }).limit(1).then(userResult => {
        let user = userResult[0]
        if(!user){ return res.sendStatus(401) }
        
        let query = { author: user._id }
        if(typeof req.body.companies.symbols !== 'undefined'){
          query[symbol] = { $in: req.body.companies.symbols }
        }

        Company.find(query).then(companies => {
          let targetCompanies = companies.map(company => company._id)
          Record.remove({ company: { $in: targetCompanies } }).then(() => {
            Company.remove({ _id: { $in: targetCompanies } }).then(() => {
              return res.sendStatus(204)
            })
          })
        })
      }).catch(next)
    }else{
      return res.status(422).json({ errors: { 'author': "can't be blank" } })
    }
  }else{
    return res.sendStatus(403)
  }
})

// List Records
router.get('/records', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    Record.find({})
      .populate({
        path: 'company',
        select: 'symbol',
        populate: {
          path: 'author',
          select: 'username proPic'
        }
      })
      .then(records => {
        return res.json({
          records: records.map(record => {
            return record.toJSONForAdmin()
          }),
          recordsCount: records.length
        })
      }).catch(next)
  }else{
    return res.sendStatus(403)
  }
})

// Count all Financials
router.get('/financials', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    Financial.find({})
      .then(financials => res.json({ financialsCount: financials.length }))
      .catch(next)
  }else{
    return res.sendStatus(403)
  }
})

// Delete Articles
router.delete('/articles', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    Article.remove({}).then(() => {
      return res.sendStatus(204)
    }).catch(next)
  }else{
    return res.sendStatus(403)
  }
})

// Customized Update Request for model modifications
let globalReq, globalRes
router.put('/shallowproperty', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    if(req.body.newProperty && req.body.newProperty.name && req.body.newProperty.default && req.body.newProperty.forModel){
      globalReq = req
      globalRes = res
      if(req.body.newProperty.forModel === 'User'){
        User.find({}).then(applyChange).catch(next)
      }else if(req.body.newProperty.forModel === 'Article'){
        Article.find({}).then(applyChange).catch(next)
      }else if(req.body.newProperty.forModel === 'Company'){
        Company.find({}).then(applyChange).catch(next)
      }else if(req.body.newProperty.forModel === 'Record'){
        Record.find({}).then(applyChange).catch(next)
      }else{ return res.status(422).json({ errors: { 'Model': 'is not found' } }) }
    }else{
      return res.status(422).json({ errors: { 'details about newProperty (i.e. name, default, forModel)': "should be complete" } })
    }
  }else{
    return res.sendStatus(403)
  }
})

// Testing Purpose
router.get('/test', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    
  }else{
    return res.sendStatus(403)
  }
})

module.exports = router

function applyChange(units){
  units.forEach((unit, index, units) => {
    unit[globalReq.body.newProperty.name] = globalReq.body.newProperty.default === 'index' ? index : globalReq.body.newProperty.default
    return unit.save(() => {
      if(index === units.length - 1){
        return globalRes.json({ "modified": unit.toJSONFor() })  
      }
      return
    })
  })
}

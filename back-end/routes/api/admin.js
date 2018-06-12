var mongoose = require('mongoose'),
    router = require('express').Router()
var auth = require('../auth')
var User = mongoose.model('User'),
    Company = mongoose.model('Company'),
    Record = mongoose.model('Record'),
    Article = mongoose.model('Article')

// List Users
router.get('/users', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    User.find({}).then((users) => {
      return res.json({
        users: users.map((user) => {
          return user.toJSONForAdmin()
        }),
        usersCount: users.length
      })
    }).catch(next)
  }else{
    return res.sendStatus(403)
  }
})

// Delete Users
router.delete('/users', auth.required, (req, res, next) => {
  if(req.payload.username === auth.admin){
    if(Array.isArray(req.body.users)){
      User.find({ username: { $in: req.body.users } }).then((users) => {
        let targetUsers = users.map((user) => user._id)
        Company.find({ author: { $in: targetUsers } }).then((companies) => {
          let targetCompanies = companies.map((company) => company._id)
          return Record.remove({ company: { $in: targetCompanies } }).then(() => {
            return Company.remove({ _id: { $in: targetCompanies } }).then(() => {
              return User.remove({ _id: { $in: targetUsers } }).then(() => {
                return res.sendStatus(204)
              })
            })
          })
        })
      }).catch(next)
    }else{
      return res.status(422).json({ errors: { 'users': 'should be an array' } })
    }
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
      req.query.author ? User.findOne({ username: { $in: [req.query.author] } }) : null
    ]).then((results) => {
      
      let user = results[0]
      if(user){
        query.author = user._id
      }

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
      })
      .then((companies) => {
        return res.json({
          companies: companies.map((company) => {
            return company.toJSONForAdmin()
          }),
          companiesCount: companies.length
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
      User.findOne({ username: req.body.companies.author }).then((user) => {
        if(!user){ return res.sendStatus(401) }
        let targetId = user._id
        Company.find({
          author: targetId,
          symbol: { $in: req.body.companies.symbols }
        }).then((companies) => {
          let targetCompanies = companies.map((company) => company._id)
          return Record.remove({ company: { $in: targetCompanies } }).then(() => {
            return Company.remove({ _id: { $in: targetCompanies } }).then(() => {
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
      .then((records) => {
        return res.json({
          records: records.map((record) => {
            return record.toJSONForAdmin()
          }),
          recordsCount: records.length
        })
      }).catch(next)
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

module.exports = router

var router = require('express').Router()

router.use('/admin', require('./admin'))
router.use('/articles', require('./articles'))
router.use('/', require('./users'))
router.use('/companies', require('./companies'))
router.use('/tags', require('./tags'))

router.use((err, req, res, next) => {
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message

        return errors
      }, {})
    })
  }

  return next(err)
})

module.exports = router

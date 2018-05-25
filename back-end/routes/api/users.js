var mongoose = require('mongoose'),
    passport = require('passport'),
    router = require('express').Router()
var auth = require('../auth')
var User = mongoose.model('User')



module.exports = router

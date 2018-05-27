var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken')

var secret = require('../config').secret

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true },
  proPic: String,
  hash: String,
  salt: String
}, { timestamps: true})

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

// Methods

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.validPassword = function(password){
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')

  return this.hash === hash
}

UserSchema.methods.generateJWT = function(){
  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30)
  }, secret)
}

UserSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    proPic: this.proPic,
    token: this.generateJWT()
  }
}

UserSchema.methods.toJSONForAdmin = function(){
  return {
    username: this.username,
    proPic: this.proPic || 'https://static.productionready.io/images/smiley-cyrus.jpg'
  }
}

mongoose.model('User', UserSchema)

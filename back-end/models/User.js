var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken')

var secret = require('../config').secret

var UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
  proPic: String,
  hash: String,
  salt: String
}, { timestamps: true})


// Methods

UserSchema.methods.setPassword = (password) => {
  let randomBytes = crypto.randomBytes(16)
  this.salt = randomBytes.toString('hex')

  let buffer = crypto.pbkdf2Sync(password, this.salt, 7777777, 512, 'sha512')
  this.hash = buffer.toString('hex')
  
  // Testing
  console.log('randomBytes:', randomBytes)
  console.log('salt:', this.salt)
  
  console.log('buffer:', buffer)
  console.log('hash:', hash)
}

UserSchema.methods.validPassword = (password) => {
  let hash = crypto.pbkdf2Sync(password, this.salt, 7777777, 512, 'sha512')

  return this.hash === hash
}

UserSchema.methods.generateJWT = () => {
  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30)
  }, secret)
}

UserSchema.methods.toAuthJSON = () => {
  return {
    user: {
      username: this.username,
      proPic: this.proPic,
      token: this.generateJWT()
    }
  }
}

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

mongoose.model('User', UserSchema)

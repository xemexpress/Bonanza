var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose')
var User = mongoose.model('User')

passport.use(new LocalStrategy({
  usernameField: 'user[username]',
  passwordField: 'user[password]'
}, (username, password, done) => {
  User.findOne({ username: username }).then(user => {
    if(!user || !user.validPassword(password)){
      return done(null, false, { errors: { 'email or password': 'is invalid' } })
    }

    return done(null, user)
  }).catch(done)
}))

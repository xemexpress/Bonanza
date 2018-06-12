var express = require('express'),
    cors = require('cors'),
    morgan = require('morgan'),
    bodyParser = require('body-parser')
    methodOverride = require('method-override'),
    session = require('express-session'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose')

var isProduction = process.env.NODE_ENV === 'production'

// Create global app object
var app = express()

app.use(cors())

// Express config
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(methodOverride())
app.use(express.static('public'))

app.use(session({ secret: 'bonanza', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))

if(!isProduction){
  app.use(errorhandler())
}

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI) 
}else{
  mongoose.connect('mongodb://localhost/bonanza')
  mongoose.set('debug', true)
}

// Models
require('./models/Article')
require('./models/User')
require('./models/Company')
require('./models/Record')

// Middlewares
require('./config/passport')

// Routes
app.use(require('./routes'))

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  if(!isProduction){
    console.log(err.stack)
  }

  res.status(err.status || 500)

  res.json({
    errors: {
      message: err.message,
      error: isProduction ? {} : err
    }
  })
})

var server = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port ' + server.address().port)
})

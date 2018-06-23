var mongoose = require('mongoose')

var CompanySchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: [true, "can't be blank"],
    match: [/^[0-9]+$/, 'is invalid']
  },
  name: {
    type: String,
    required: [true, "can't be blank"]
  },
  abbr: String,
  logo: String,
  link: String,
  tagList: [{ type: String }],
  records: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Record'
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

CompanySchema.methods.setAbbr = function(){
  this.abbr = this.name.substr(0,4)
}

CompanySchema.pre('validate', function(next){
  if(!this.abbr){
    this.setAbbr()
  }

  next()
})

CompanySchema.methods.toJSONFor = function(){
  return {
    // Testing whether updatedAt would change when records change
    updatedAt: this.updatedAt,
    symbol: this.symbol,
    abbr: this.abbr,
    logo: this.logo || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    name: this.name,
    tagList: this.tagList
  }
}

CompanySchema.methods.toJSONForAdmin = function(){
  return {
    symbol: this.symbol,
    years: this.records.map(record => record.year),
    author: this.author.toJSONFor()
  }
}

mongoose.model('Company', CompanySchema)

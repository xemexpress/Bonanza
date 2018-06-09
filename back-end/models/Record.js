var mongoose = require('mongoose')

var SegmentSchema = new mongoose.Schema({
  business: {
    type: String,
    required: [true, "can't be blank"]
  },
  grossProfitMargin: Number,
  share: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
})

var PlanSchema = new mongoose.Schema({
  plan: {
    type: String,
    required: [true, "can't be blank"]
  },
  executed: String
})

var RecordSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, "can't be blank"],
    match: [/\d{4}[my]/, 'is invalid']
  },
  key: String,
  businessSegments: [SegmentSchema],
  grossProfitMargin: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  plans: [PlanSchema],
  actionsDone: [{
    type: String,
    required: [true, "can't be blank"]
  }],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    alias: 'forCompany'
  }
}, { timestamps: true })

RecordSchema.methods.toJSONFor = function(){
  return {
    year: this.year,
    key: this.key,
    businessSegments: this.businessSegments,
    grossProfitMargin: this.grossProfitMargin,
    plans: this.plans,
    actionsDone: this.actionsDone
  }
}

RecordSchema.methods.toJSONForAdmin = function(){
  return {
    symbol: this.company.symbol,
    year: this.year,
    author: this.company.author.toJSONForAdmin()
  }
}

mongoose.model('Record', RecordSchema)

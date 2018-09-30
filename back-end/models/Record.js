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
  executed: {
    type: String,
    match: [/\d{4}[MY]/, 'is invalid']
  }
})

var RecordSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, "can't be blank"],
    match: [/\d{4}[MY]/, 'is invalid']
  },
  keyList: [{ type: String }],
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
  }]
}, { timestamps: true })

RecordSchema.methods.toJSONFor = function(){
  return {
    updatedAt: this.updatedAt,
    year: this.year,
    keyList: this.keyList,
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
    author: this.company.author.toJSONFor()
  }
}

mongoose.model('Record', RecordSchema)

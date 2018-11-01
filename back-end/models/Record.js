var mongoose = require('mongoose')

var RecordSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, "can't be blank"],
    match: [/\d{4}[MY]/, 'is invalid']
  },
  keyList: [String],
  businessSegments: [{
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
  }],
  grossProfitMargin: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  plans: [{
    plan: {
      type: String,
      required: [true, "can't be blank"]
    },
    executed: {
      type: String,
      match: [/\d{4}[MY]/, 'is invalid']
    }
  }],
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

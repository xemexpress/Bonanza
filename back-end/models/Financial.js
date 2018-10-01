var mongoose = require('mongoose')

var FinancialSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, "can't be blank"],
    match: [/\d{8}Y*/, 'is invalid']
  },
  currency: {
    type: String,
    required: [true, "can't be blank"],
    match: [/.?[A-Z]{3}/, 'is invalid']
  },
  sharesOutstanding: {
    type: Number,
    min: 1,
    default: 1
  },
  cashFlow: {
    netOperating: Number,
    netInvesting: Number,
    netFinancing: Number
  },
  resonance: {
    revenue: Number,
    sellingExpense: Number,
    salesCost: Number,
    adminCost: Number,
    financingCost: Number,
    otherRevenues: Number,
    profitBeforeTax: Number,
    profit: Number
  },
  position: {
    currentAssets: {
      cash: Number,
      receivables: Number,
      inventory: Number,
      total: Number
    },
    currentLiabilities: {
      payables: Number,
      tax: Number,
      total: Number
    },
    nonCurrentAssets: {
      propertyPlantEquip: Number,
      total: Number
    },
    nonCurrentLiabilities: {
      total: Number
    },
    totalAssets: Number,
    totalLiabilities: Number
  }
}, { timestamps: true })

FinancialSchema.methods.toJSONFor = function(){
  return {
    updatedAt: this.updatedAt,
    year: this.year,
    currency: this.currency,
    sharesOutstanding: this.sharesOutstanding,
    resonance: this.resonance,
    position: this.position,
    cashFlow: this.cashFlow
  }
}

mongoose.model('Financial', FinancialSchema)

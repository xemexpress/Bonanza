var mongoose = require('mongoose')

var FinancialSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, "can't be blank"],
    match: [/\d{4}[MY]/, 'is invalid']
  },
  resonance: {
    revenue: Number,
    salesCost: Number,
    adminCost: Number,
    financingCost: Number,
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
      oneYearDebt: Number,
      total: Number
    },
    nonCurrentAssets: {
      propertyPlantEquip: Number,
      accumulatedAmortization: Number,
      goodWill: Number,
      total: Number
    },
    nonCurrentLiabilities: {
      aboveOneYearDebt: Number,
      total: Number
    }
  },
  cashFlow: {
    netOperating: Number,
    netInvesting: Number,
    netFinancing: Number
  }
}, { timestamps: true })

FinancialSchema.methods.toJSONFor = function(){
  return {
    updatedAt: this.updatedAt,
    year: this.year,
    resonance: this.resonance,
    position: this.position,
    cashFlow: this.cashFlow
  }
}

mongoose.model('Financial', FinancialSchema)
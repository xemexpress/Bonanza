import React from 'react'
import { connect } from 'react-redux'

import CashFlow from './CashFlow'
import Resonance from './Resonance'
import Costs from './Costs'
import Position from './Position'
import NetAssetValuesPerShare from './NetAssetValuesPerShare'

import './SodiumCharts.css'

const mapStateToProps = state => ({
  hkdFromCurrency: state.xSodium.hkdFromCurrency,
  unitScale: state.xSodium.unitScale
})

const SodiumCharts = props => {
  const {
    loaded, financialsList,
    hkdFromCurrency, unitScale
  } = props
  
  if(!loaded){ return null }

  if(financialsList.length === 1 && financialsList[0].length > 0){
    const financials = financialsList[0].filter(financial => financial.resonance.revenue !== null)

    // Common
    const years = financials.map(financial => Number(financial.year.slice(0,6)) / 100)
    const currency = financials[0].currency.slice(-3)
    const currencyScale = financials[0].currency.replace(currency, '')

    // Helper functions
    const setHKD = amount => amount * hkdFromCurrency[currency]
    
    // Supplementary chart props: Costs
    const salesCosts = financials.map(financial => setHKD(financial.resonance.salesCost))
    const sellingExpenses = financials.map(financial => setHKD(financial.resonance.sellingExpense))
    const adminCosts = financials.map(financial => setHKD(financial.resonance.sellingExpense))
    const financingCosts = financials.map(financial => setHKD(financial.resonance.financingCost))

    // Supplementary chart props: NetAssetValuePerShare
    const netAssetValuesPerShare = financials.map(financial => financial.position.totalAssets !== null && financial.position.totalLiabilities !== null && financial.sharesOutstanding !== 1 ? setHKD(financial.position.totalAssets - financial.position.totalLiabilities) * unitScale[currencyScale] / financial.sharesOutstanding : null)

    // Resonance
    const revenues = financials.map(financial => setHKD(financial.resonance.revenue))
    const grossProfits = financials.map((financial, i) => Math.round(setHKD(financial.resonance.revenue - salesCosts[i] - sellingExpenses[i])*1000000)/1000000)
    const profits = financials.map(financial => setHKD(financial.resonance.profit))

    // Position
    const currentAssets = financials.map(financial => setHKD(financial.position.currentAssets.total))
    const currentLiabilities = financials.map(financial => setHKD(financial.position.currentLiabilities.total))
    const nonCurrentAssets = financials.map(financial => setHKD(financial.position.nonCurrentAssets.total))
    const nonCurrentLiabilities = financials.map(financial => setHKD(financial.position.nonCurrentLiabilities.total))

    // CashFlow
    const netOperatings = financials.map(financial => setHKD(financial.cashFlow.netOperating))
    const netInvestings = financials.map(financial => setHKD(financial.cashFlow.netInvesting))
    const netFinancings = financials.map(financial => setHKD(financial.cashFlow.netFinancing))

    return (
      <div className='s-charts'>
        <CashFlow
          years={years}
          netOperatings={netOperatings}
          netInvestings={netInvestings}
          netFinancings={netFinancings} />
        <Resonance
          years={years}
          revenues={revenues}
          grossProfits={grossProfits}
          profits={profits} />
        <Costs
          years={years}
          salesCosts={salesCosts}
          sellingExpenses={sellingExpenses}
          adminCosts={adminCosts}
          financingCosts={financingCosts} />
        <Position
          years={years}
          currentAssets={currentAssets}
          currentLiabilities={currentLiabilities}
          nonCurrentAssets={nonCurrentAssets}
          nonCurrentLiabilities={nonCurrentLiabilities} />
        <NetAssetValuesPerShare
          years={years}
          netAssetValuesPerShare={netAssetValuesPerShare} />
      </div>
    )
  }

  return (
    <div>
      {String(financialsList)}
    </div>
  )
}

export default connect(mapStateToProps, ()=>({}))(SodiumCharts)

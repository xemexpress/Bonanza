import React from 'react'
import { connect } from 'react-redux'

import SChart from './SChart'
import CashFlow from './CashFlow'
import Resonance from './Resonance'
import Costs from './Costs'
import Position from './Position'
import NetAssetValuesPerShare from './NetAssetValuesPerShare'

import './SodiumCharts.css'

const mapStateToProps = state => ({
  ...state.dSodium,
  hkdFromCurrency: state.xSodium.hkdFromCurrency,
  unitScale: state.xSodium.unitScale
})

const SodiumCharts = props => {
  if(!props.loaded){ return null }

  if(props.financialsList.length === 1 && props.financialsList[0].length > 0){
    const financials = props.financialsList[0].filter(financial => financial.resonance.revenue !== null)

    // Common
    const years = financials.map(financial => Number(financial.year.slice(0,6)) / 100)
    const currency = financials[0].currency.slice(-3)
    const currencyScale = financials[0].currency.replace(currency, '')
    
    // Supplementary chart props: Costs
    const salesCosts = financials.map(financial => financial.resonance.salesCost)
    const sellingExpenses = financials.map(financial => financial.resonance.sellingExpense)
    const adminCosts = financials.map(financial => financial.resonance.sellingExpense)
    const financingCosts = financials.map(financial => financial.resonance.financingCost)

    // Supplementary chart props: NetAssetValuePerShare
    const netAssetValuesPerShare = financials.map(financial => financial.position.totalAssets !== null && financial.position.totalLiabilities !== null && financial.sharesOutstanding !== 1 ? (financial.position.totalAssets - financial.position.totalLiabilities) * props.unitScale[currencyScale] * props.hkdFromCurrency[currency] / financial.sharesOutstanding : null)

    // Resonance
    const revenues = financials.map(financial => financial.resonance.revenue)
    const grossProfits = financials.map((financial, i) => Math.round((financial.resonance.revenue - salesCosts[i] - sellingExpenses[i])*1000000)/1000000)
    const profits = financials.map(financial => financial.resonance.profit)

    // Position
    const currentAssets = financials.map(financial => financial.position.currentAssets.total)
    const currentLiabilities = financials.map(financial => financial.position.currentLiabilities.total)
    const nonCurrentAssets = financials.map(financial => financial.position.nonCurrentAssets.total)
    const nonCurrentLiabilities = financials.map(financial => financial.position.nonCurrentLiabilities.total)

    // CashFlow
    const netOperatings = financials.map(financial => financial.cashFlow.netOperating)
    const netInvestings = financials.map(financial => financial.cashFlow.netInvesting)
    const netFinancings = financials.map(financial => financial.cashFlow.netFinancing)

    if(financials[0])
    return (
      <div className='s-charts'>
        <SChart>
          <CashFlow
            years={years}
            netOperatings={netOperatings}
            netInvestings={netInvestings}
            netFinancings={netFinancings} />
        </SChart>
        <SChart>
          <Resonance
            years={years}
            revenues={revenues}
            grossProfits={grossProfits}
            profits={profits} />
        </SChart>
      {
        props.showCosts ?
        <SChart>
          <Costs
            years={years}
            salesCosts={salesCosts}
            sellingExpenses={sellingExpenses}
            adminCosts={adminCosts}
            financingCosts={financingCosts} />
        </SChart>
        : null
      }
        <SChart>
          <Position
            years={years}
            currentAssets={currentAssets}
            currentLiabilities={currentLiabilities}
            nonCurrentAssets={nonCurrentAssets}
            nonCurrentLiabilities={nonCurrentLiabilities} />
        </SChart>
      {
        props.showNetAssetValuePerShare ?
        <SChart>
          <NetAssetValuesPerShare
            years={years}
            netAssetValuesPerShare={netAssetValuesPerShare} />
        </SChart>
        : null
      }
      </div>
    )
  }

  return (
    <div>
      {String(props.financialsList)}
    </div>
  )
}

export default connect(mapStateToProps, ()=>({}))(SodiumCharts)

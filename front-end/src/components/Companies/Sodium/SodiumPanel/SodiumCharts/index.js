import React from 'react'
import { connect } from 'react-redux'

import CashFlow from './CashFlow'
import Resonance from './Resonance'
import Costs from './Costs'
import Position from './Position'
import NetAssetValuesPerShare from './NetAssetValuesPerShare'
import SCompare from './SCompare'

import './SodiumCharts.css'

const mapStateToProps = state => ({
  hkdFromCurrency: state.xSodium.hkdFromCurrency,
  unitScale: state.xSodium.unitScale
})

const SodiumCharts = props => {
  const {
    loaded, selectedCompanies, financialsList,
    hkdFromCurrency, unitScale
  } = props
  
  if(!loaded){ return null }

  if(selectedCompanies.length === 1){
    let financials = financialsList[0]
    if(financials.length === 0){ return null }

    financials = financials.filter(financial => financial.resonance.revenue !== null)

    // Common
    const years = financials.map(financial => Number(financial.year.slice(0,6)) / 100)
    const currency = financials[0].currency.slice(-3)
    const currencyScale = financials[0].currency.replace(currency, '')
  
    // Helper functions
    const setHKD = amount => amount * hkdFromCurrency[currency]
    const makeScale = amount => amount * unitScale[currencyScale]

    // Supplementary chart props: Costs
    const salesCosts = financials.map(financial => setHKD(financial.resonance.salesCost))
    const sellingExpenses = financials.map(financial => setHKD(financial.resonance.sellingExpense))
    const adminCosts = financials.map(financial => setHKD(financial.resonance.sellingExpense))
    const financingCosts = financials.map(financial => setHKD(financial.resonance.financingCost))

    // Supplementary chart props: NetAssetValuePerShare
    const netAssetValuesPerShare = financials.map(financial => financial.position.totalAssets && financial.position.totalLiabilities && financial.sharesOutstanding !== 1 ? makeScale(setHKD(financial.position.totalAssets - financial.position.totalLiabilities)) / financial.sharesOutstanding : null)

    // Resonance
    const revenues = financials.map(financial => setHKD(financial.resonance.revenue))
    const grossProfits = financials.map((financial, i) => Math.round(setHKD(financial.resonance.revenue - salesCosts[i] - sellingExpenses[i]) * 1000000) / 1000000)
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
  }else if(selectedCompanies.length > 1){    
    const companyAbbrNamesAndSymbols = selectedCompanies.map(company => company.abbr.concat(` ${company.symbol}`))
    const yFinancialsList = financialsList.map(financials => financials.filter(financial => financial.year.endsWith('Y')))
    const currencyList = yFinancialsList.map(financials => financials.length > 0 ? financials[0].currency.slice(-3) : null)
    const setHKD = (amount, i) => amount * hkdFromCurrency[currencyList[i]]

    const yearsList = yFinancialsList.map(financials => financials.map(financial => financial.year.slice(0,4)))
    const netAssetValuesList = yFinancialsList.map((financials, i) => financials.map(financial => financial.position.totalAssets && financial.position.totalLiabilities ? setHKD(financial.position.totalAssets - financial.position.totalLiabilities, i) : null))
    const netCashFlowsList = yFinancialsList.map((financials, i) => financials.map(financial => financial.cashFlow.netOperating && financial.cashFlow.netInvesting && financial.cashFlow.netFinancing ? setHKD(financial.cashFlow.netOperating + financial.cashFlow.netInvesting + financial.cashFlow.netFinancing, i) : null))
    const resonancesList = yFinancialsList.map((financials, i) => financials.map((financial, j) => financial.resonance.profit && netAssetValuesList[i][j] ? setHKD(financial.resonance.profit, i) / netAssetValuesList[i][j] : null))

    return (
      <div className='s-charts'>
        <SCompare
          companyInfos={companyAbbrNamesAndSymbols}
          yearsList={yearsList}
          netAssetValuesList={netAssetValuesList}
          netCashFlowsList={netCashFlowsList}
          resonancesList={resonancesList} />
      </div>
    )
  }
}

export default connect(mapStateToProps, ()=>({}))(SodiumCharts)

import React from 'react'
import { connect } from 'react-redux'

import UpdatedSince from './UpdatedSince'
import PEButton from './PEButton'
import PBButton from './PBButton'
import RButton from './RButton'

import agent from '../../../../../../../agent'

import './SProfile.css'

import {
  LOAD_XSODIUM_EXCHANGE_RATES,
  API_ROOT,
  SMILEY
} from '../../../../../../../constants'

// Helper functions
const latestYRecord = financials => financials.filter(financial => financial.year.endsWith('Y')).slice(-1)[0]
const average = financials => financials.reduce((prev, financial) => prev + financial.resonance.profit, 0) / financials.length

const mapStateToProps = state => ({
  currencies: state.sodium.currencies,
  hkdFromCurrency: state.xSodium.hkdFromCurrency,
  exchangeRatesUpdated: state.xSodium.exchangeRatesUpdated,
  unitScale: state.xSodium.unitScale
})

const mapDispatchToProps = dispatch => ({
  onLoadExchangeRates: currencies => dispatch({
    type: LOAD_XSODIUM_EXCHANGE_RATES,
    payload: Promise.all(currencies.map(currency => agent.XSodium.getHKDFrom(currency)))
  })
})

class SProfile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      date: '',
      currency: '',
      currencyScale: '',
      sharesOutstanding: '',
      profit: '',
      averageProfit: '',
      totalAssets: '',
      totalLiabilities: ''
    }
  }

  componentWillMount(){
    this.setState({
      date: latestYRecord(this.props.financials).year.slice(0,6),
      currency: latestYRecord(this.props.financials).currency.slice(-3),         // 3-letter: 'HKD', 'RMB', 'USD'
      currencyScale: latestYRecord(this.props.financials).currency.replace(latestYRecord(this.props.financials).currency.slice(-3), ''),
      sharesOutstanding: latestYRecord(this.props.financials).sharesOutstanding,
      profit: latestYRecord(this.props.financials).resonance.profit,
      averageProfit: average(this.props.financials.filter(financial => financial.year.endsWith('Y')).slice(-7)),
      totalAssets: latestYRecord(this.props.financials).position.totalAssets,
      totalLiabilities: latestYRecord(this.props.financials).position.totalLiabilities
    })
    
    const exchangeRatesToBeUpdated = this.props.currencies.filter(currency => !this.props.exchangeRatesUpdated[currency])
    if(exchangeRatesToBeUpdated.length > 0){
      this.props.onLoadExchangeRates(exchangeRatesToBeUpdated)
    }
  }

  render(){
    // Basic data for rendering.
    // [netAssetValue (unit: 1億)] [netAssetValuePerShare (unit: 1)]
    const {
      date, currency, currencyScale, sharesOutstanding,
      profit, averageProfit,
      totalAssets, totalLiabilities
    } = this.state
    
    const {
      company, quote,
      hkdFromCurrency, unitScale
    } = this.props
    
    // Helper functions
    const setUnitHKD = amount => amount * unitScale[currencyScale] * hkdFromCurrency[currency]
    
    // Processed data
    const netAssetValue = totalAssets !== null && totalLiabilities !== null ? totalAssets - totalLiabilities : NaN
    const netAssetValuePerShare = netAssetValue ? setUnitHKD(netAssetValue) / sharesOutstanding : NaN
    const averageEarningsPerShare = setUnitHKD(averageProfit) / sharesOutstanding

    return (
      <div className='row'>
        <div className='col-xs-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6 offset-lg-3 col-lg-6'>
          <div className='s-profile'>
            <div className='info'>
            {
              company.link ?
              <a href={company.link} target="_blank" rel="noopener noreferrer">
                <img className='logo' src={API_ROOT === 'http://localhost:3000/api' ? SMILEY : company.logo} alt={company.abbr} />
              </a>
              : <img className='logo' src={API_ROOT === 'http://localhost:3000/api' ? SMILEY : company.logo} alt={company.abbr} />
            }
              <div className='name'>{company.abbr}</div>
              <UpdatedSince date={date} />
            </div>
            <div className='indices'>
              <PEButton quote={quote} averageEarningsPerShare={averageEarningsPerShare} />
              &nbsp;
              <PBButton quote={quote} netAssetValuePerShare={netAssetValuePerShare} />
              &nbsp;
              <RButton profit={profit} netAssetValue={netAssetValue} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SProfile)

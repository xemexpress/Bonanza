import React from 'react'
import { connect } from 'react-redux'

import UpdatedSince from './UpdatedSince'
import PEButton from './PEButton'
import PBButton from './PBButton'
import RButton from './RButton'

import './SProfile.css'

import {
  API_ROOT,
  SMILEY
} from '../../../../../../../constants'

// Helper functions
const getLatestYRecord = financials => financials.filter(financial => financial.year.endsWith('Y')).slice(-1)
const average = financials => financials.reduce((prev, financial) => prev + financial.resonance.profit, 0) / financials.length

const mapStateToProps = state => ({
  hkdFromCurrency: state.xSodium.hkdFromCurrency,
  unitScale: state.xSodium.unitScale
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
    let latestYRecord = getLatestYRecord(this.props.financials)
    if(latestYRecord.length !== 0){
      latestYRecord = latestYRecord[0]
      this.setState({
        date: latestYRecord.year.slice(0,6),
        currency: latestYRecord.currency.slice(-3),         // 3-letter: 'HKD', 'RMB', 'USD'
        currencyScale: latestYRecord.currency.replace(latestYRecord.currency.slice(-3), ''),
        sharesOutstanding: latestYRecord.sharesOutstanding,
        profit: latestYRecord.resonance.profit,
        averageProfit: average(this.props.financials.filter(financial => financial.year.endsWith('Y')).slice(-7)),
        totalAssets: latestYRecord.position.totalAssets,
        totalLiabilities: latestYRecord.position.totalLiabilities
      })
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
    const netAssetValue = totalAssets && totalLiabilities ? totalAssets - totalLiabilities : NaN
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
                <img className='logo' src={company.logo} alt={company.abbr} />
              </a>
              : <img className='logo' src={company.logo} alt={company.abbr} />
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

export default connect(mapStateToProps, ()=>({}))(SProfile)

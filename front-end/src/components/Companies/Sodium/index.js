import React from 'react'
import { connect } from 'react-redux'

import SodiumController from './SodiumController'
import SodiumPanel from './SodiumPanel'
import Cloak from '../../common/Cloak'
import agent from '../../../agent'

import {
  LOAD_XSODIUM_EXCHANGE_RATES,
  OTHER_CURRENCIES
} from '../../../constants'

const mapStateToProps = state => ({
  ...state.sodium
})

const mapDispatchToProps = dispatch => ({
  onLoadExchangeRates: currencies => dispatch({
    type: LOAD_XSODIUM_EXCHANGE_RATES,
    payload: Promise.all(currencies.map(currency => agent.XSodium.getHKDFrom(currency)))
  })
})

class Sodium extends React.Component {
  componentWillMount(){
    const now = Date.now()
    const exchangeRatesUpdatedAt = Number(window.localStorage.getItem('exchangeRatesUpdatedAt'))
    // Format: { HKD: msSinceJan_1_1970, RMB: msSinceJan_1_1970, USD: msSinceJan_1_1970 }
    
    const days = num => num * 24 * 3600 * 1000
    const timeLast = now - exchangeRatesUpdatedAt
    if(isNaN(exchangeRatesUpdatedAt) || timeLast > days(7)){
      this.props.onLoadExchangeRates(OTHER_CURRENCIES)
    }
  }

  render(){
    return (
      <React.Fragment>
        <Cloak visibleCondition={!this.props.loaded} inTime={.1} outTime={.3}>
          <SodiumController
            canEdit={this.props.canEdit}
            isSodium={this.props.isSodium}
            loaded={false} />
        </Cloak>
        <SodiumPanel
          isSodium={this.props.isSodium}
          loaded={this.props.loaded}
          inProgress={this.props.inProgress}
          selectedCompanies={this.props.selectedCompanies}
          financialsList={this.props.financialsList} />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sodium)

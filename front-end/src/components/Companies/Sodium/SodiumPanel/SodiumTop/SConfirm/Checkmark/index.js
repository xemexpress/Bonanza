import React from 'react'
import { connect } from 'react-redux'

import Loader from '../../../../../../common/Loader'
import agent from '../../../../../../../agent'

import './Checkmark.css'

import {
  LOAD_SODIUM_FINANCIALS,
  LOAD_XSODIUM_QUOTES,
  UNLOAD_SODIUM
} from '../../../../../../../constants'

const mapStateToProps = state => ({
  symbols: state.sodium.selectedCompanies.map(company => company.symbol),
  inProgress: state.sodium.inProgress
})

const mapDispatchToProps = dispatch => ({
  onLoadFinancials: symbols => dispatch({
    type: LOAD_SODIUM_FINANCIALS,
    payload: Promise.all(symbols.map(symbol => agent.Financials.all(symbol)))
  }),
  onLoadQuotes: symbols => dispatch({
    type: LOAD_XSODIUM_QUOTES,
    payload: Promise.all(symbols.map(symbol => agent.XSodium.getQuote(symbol)))
  }),
  onUnload: () => dispatch({
    type: UNLOAD_SODIUM
  })
})

const Checkmark = props => {
  let className = 'checkmark'.concat(props.loaded ? ' go-pick' : props.selected ? ' submit' : '')

  let check = ev => {
    ev.preventDefault()

    if(props.loaded || props.inProgress){
      props.onUnload()
    }else if(props.selected){
      props.onLoadFinancials(props.symbols)
      props.onLoadQuotes(props.symbols)
    }
  }
  
  return (
    props.inProgress ?
    <Loader>
      <b>.</b>
    </Loader>
    : <span className={className} onClick={check} />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkmark)

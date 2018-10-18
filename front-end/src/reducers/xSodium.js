import {
  LOAD_XSODIUM_QUOTES,
  LOAD_XSODIUM_EXCHANGE_RATES,
  UNLOAD_SODIUM
} from '../constants'

// Helper function
const namingFix = fromCurrency => fromCurrency === 'CNY' ? 'RMB' : fromCurrency

// Local Storage
const exchangeRates = JSON.parse(window.localStorage.getItem('exchangeRates'))

const defaultState = {
  quotes: [],
  hkdFromCurrency: exchangeRates !== null ? exchangeRates : { HKD: 1, RMB: 1.2496, USD: 7.85 },
  unitScale: { '億': 100000000 }
}

export default (state=defaultState, action) => {
  switch(action.type){
    case LOAD_XSODIUM_QUOTES:
      return {
        ...state,
        quotes: action.error || !action.payload.filter(res => res.body.hasOwnProperty('Global Quote')).length ? [] : action.payload.map(res => res.body['Global Quote']['05. price'])
      }
    case LOAD_XSODIUM_EXCHANGE_RATES:
      if(!action.error){
        const exchangeRates = state.hkdFromCurrency
        action.payload.forEach(res => {
          let fromCurrency = namingFix(res.body['Realtime Currency Exchange Rate']['1. From_Currency Code'])
          let toHKD = Number(res.body['Realtime Currency Exchange Rate']['5. Exchange Rate'])
          exchangeRates[fromCurrency] = toHKD
        })
        window.localStorage.setItem('exchangeRates', JSON.stringify(exchangeRates))
        window.localStorage.setItem('exchangeRatesUpdatedAt', Date.now())
        
        return {
          ...state,
          hkdFromCurrency: exchangeRates
        }
      }
      break
    case UNLOAD_SODIUM:
      return defaultState
    default:
  }

  return state
}

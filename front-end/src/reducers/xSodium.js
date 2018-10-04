import {
  LOAD_XSODIUM_QUOTES,
  LOAD_XSODIUM_EXCHANGE_RATES,
  UNLOAD_SODIUM
} from '../constants'

const defaultState = {
  quotes: [],
  hkdFromCurrency: { HKD: 1, RMB: 1.2496, USD: 7.85 },
  exchangeRatesUpdated: { HKD: false, RMB: false, USD: false },
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
        const realTimeQuotes = state.hkdFromCurrency
        const updateCheck = state.exchangeRatesUpdated

        const results = action.payload.map(res => [res.body['Realtime Currency Exchange Rate']['1. From_Currency Code'], Number(res.body['Realtime Currency Exchange Rate']['5. Exchange Rate'])])
        // Results in format: [[fromCurrency, toHKD]]
        results.forEach(([fromCurrency, toHKD]) => {
          fromCurrency = fromCurrency === 'CNY' ? 'RMB' : fromCurrency
          realTimeQuotes[fromCurrency] = toHKD
          updateCheck[fromCurrency] = true
        })
        return {
          ...state,
          hkdFromCurrency: realTimeQuotes,
          exchangeRatesUpdated: updateCheck
        }
      }
      break
    case UNLOAD_SODIUM:
      return {
        ...defaultState,
        exchangeRatesUpdated: state.exchangeRatesUpdated
      }
    default:
  }

  return state
}

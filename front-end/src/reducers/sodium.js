import {
  SWITCH_SODIUM,
  SELECT_COMPANY,
  LOAD_SODIUM_FINANCIALS,
  UNLOAD_SODIUM,
  ASYNC_START
} from '../constants'

const defaultState = {
  isSodium: false,
  loaded: false,
  selectedCompanies: [],
  financialsList: [],
  currencies: []
}

export default (state=defaultState, action) => {
  switch(action.type){
    case SWITCH_SODIUM:
      return {
        ...state,
        isSodium: !state.isSodium,
        loaded: false,
        selectedCompanies: [],
        financialsList: []
      }
    case SELECT_COMPANY:
      if(state.selectedCompanies.length !== 0 && state.selectedCompanies.indexOf(action.company) !== -1){
        return {
          ...state,
          inProgress: false,
          selectedCompanies: state.selectedCompanies.filter(company => company.symbol !== action.company.symbol)
        }
      }else{
        return {
          ...state,
          inProgress: false,
          selectedCompanies: state.selectedCompanies.concat(action.company)
        }
      }
    case ASYNC_START:
      if(action.subtype === LOAD_SODIUM_FINANCIALS){
        return {
          ...state,
          inProgress: true
        }
      }
      break
    case LOAD_SODIUM_FINANCIALS:
      return {
        ...state,
        inProgress: false,
        loaded: !action.error && state.inProgress,
        financialsList: action.error || !state.inProgress ? [] : action.payload.map(companyData => companyData.financials),
        currencies: action.error || !state.inProgress ? [] : action.payload.map(companyData => companyData.financials).map(financials => financials.map(financial => financial.currency)).flat().filter((value, index, array) => array.indexOf(value) === index).map(currency => currency.slice(-3))
      }
    case UNLOAD_SODIUM:
      return {
        ...state,
        inProgress: false,
        loaded: false,
        financialsList: []
      }
    default:
  }

  return state
}

import {
  SWITCH_SODIUM,
  SELECT_COMPANY,
  LOAD_SODIUM,
  UNLOAD_SODIUM,
  ASYNC_START
} from '../constants'

const defaultState = {
  // Testing
  isSodium: true,
  // isSodium: false,
  loaded: false,
  selectedCompanies: [],
  financials: []
}

export default (state=defaultState, action) => {
  switch(action.type){
    case SWITCH_SODIUM:
      return {
        ...state,
        isSodium: !state.isSodium,
        loaded: false,
        selectedCompanies: [],
        financials: []
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
      if(action.subtype === LOAD_SODIUM){
        return {
          ...state,
          inProgress: true
        }
      }
      break
    case LOAD_SODIUM:
      return {
        ...state,
        inProgress: false,
        loaded: !action.error && state.inProgress,
        financials: action.error || !state.inProgress ? [] : action.payload.map(companyData => companyData.financials)
      }
    case UNLOAD_SODIUM:
      return {
        ...state,
        inProgress: false,
        loaded: false,
        financials: []
      }
    default:
  }
  return state
}

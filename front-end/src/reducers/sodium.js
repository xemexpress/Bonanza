import {
  SWITCH_SODIUM,
  SELECT_COMPANY,
  LOAD_SODIUM,
  UNLOAD_SODIUM
} from '../constants'

const defaultState = {
  // Testing
  isSodium: true,
  // isSodium: false,
  loaded: false,
  selectedCompanies: [],
  financials: {}
}

export default (state=defaultState, action) => {
  switch(action.type){
    case SWITCH_SODIUM:
      return {
        ...state,
        isSodium: !state.isSodium,
        loaded: false,
        selectedCompanies: []
      }
    case SELECT_COMPANY:
      if(state.selectedCompanies.length !== 0 && state.selectedCompanies.indexOf(action.company) !== -1){
        return {
          ...state,
          selectedCompanies: state.selectedCompanies.filter(company => company.symbol !== action.company.symbol)
        }
      }else{
        return {
          ...state,
          selectedCompanies: state.selectedCompanies.concat(action.company)
        }
      }
    case LOAD_SODIUM:
      console.log('loaded: true')
      return {
        ...state,
        loaded: true
      }
    case UNLOAD_SODIUM:
      return {
        ...state,
        loaded: false,
        financials: {}
      }
    default:
  }
  return state
}

import {
  COMPANIES_PAGE_LOADED,
  COMPANIES_PAGE_UNLOADED,
  ALLOW_EDIT_COMPANIES,
  DELETE_COMPANY,
  COMPANIES_PAGE_SEARCH_LOADED,
  COMPANIES_PAGE_TAG_LOADED,
  SWITCH_SODIUM,
  SELECT_COMPANY
} from "../constants"

const defaultState = {
  search: '',
  tag: '',
  canEdit: false,
  // Testing
  isSodium: true,
  // isSodium: false,
  soCompanies: []
}

export default (state=defaultState, action) => {
  switch(action.type){
    case COMPANIES_PAGE_LOADED:
      return {
        ...state,
        companies: (state.companies || []).concat(action.payload.companies),
        companiesCount: action.payload.companiesCount
      }
    case COMPANIES_PAGE_SEARCH_LOADED:
      return {
        ...state,
        companies: action.payload.companies,
        companiesCount: action.payload.companiesCount,
        search: action.companyName
      }
    case COMPANIES_PAGE_TAG_LOADED:
      return {
        ...state,
        companies: action.payload.companies,
        companiesCount: action.payload.companiesCount,
        tag: action.tag
      }
    case COMPANIES_PAGE_UNLOADED:
      return defaultState
    case ALLOW_EDIT_COMPANIES:
      return {
        ...state,
        canEdit: !state.canEdit
      }
    case DELETE_COMPANY:
      const companySymbol = action.companySymbol
      return {
        ...state,
        companiesDeleted: (state.companiesDeleted || 0) + 1,
        companies: state.companies.filter(company => company.symbol !== companySymbol),
        canEdit: false
      }
    case SWITCH_SODIUM:
      return {
        ...state,
        isSodium: !state.isSodium,
        soCompanies: []
      }
    case SELECT_COMPANY:
      if(state.soCompanies.length !== 0 && state.soCompanies.indexOf(action.company) !== -1){
        return {
          ...state,
          soCompanies: state.soCompanies.filter(company => company.symbol !== action.company.symbol)
        }
      }else{
        return {
          ...state,
          soCompanies: state.soCompanies.concat(action.company)
        }
      }
    default:
  }
  return state
}

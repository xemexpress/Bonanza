import {
  COMPANIES_PAGE_LOADED,
  COMPANIES_PAGE_UNLOADED,
  ALLOW_EDIT_COMPANIES,
  DELETE_COMPANY
} from "../constants"

const defaultState = {
  canEdit: false
}

export default (state=defaultState, action) => {
  switch(action.type){
    case COMPANIES_PAGE_LOADED:
      return {
        ...state,
        companies: (state.companies || []).concat(action.payload.companies),
        companiesCount: action.payload.companiesCount
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
        companies: state.companies.filter(company => company.symbol !== companySymbol)
      }
    default:
  }
  return state
}

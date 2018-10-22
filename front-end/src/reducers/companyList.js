import {
  COMPANIES_PAGE_LOADED,
  COMPANIES_PAGE_UNLOADED,
  ALLOW_EDIT_COMPANIES,
  DELETE_COMPANY,
  COMPANIES_PAGE_SEARCH_LOADED,
  COMPANIES_PAGE_TAG_LOADED,
  THE_TAGS
} from '../constants'

const defaultState = {
  search: '',
  tags: THE_TAGS,
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
        tags: action.tags
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
    default:
  }
  
  return state
}

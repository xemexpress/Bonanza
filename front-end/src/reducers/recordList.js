import {
  VIEW_COMPANY_RECORDS,
  RECORDS_PAGE_UNLOADED,
  RECORDS_PAGE_LOADED,
  TOGGLE_PLAN,
  ALLOW_EDIT_RECORDS,
  DELETE_RECORD
} from '../constants'

const defaultState = {
  company: null,
  records: null,
  canEdit: false,
  showPlans: false
}

export default (state=defaultState, action) => {
  switch(action.type){
    case RECORDS_PAGE_LOADED:
      return {
        ...state,
        company: action.error ? null : action.payload[0].company,
        records: action.error ? null : action.payload[1].records
      }
    case VIEW_COMPANY_RECORDS:
      return {
        ...state,
        company: action.company
      }
    case TOGGLE_PLAN:
      return {
        ...state,
        showPlans: !state.showPlans
      }
    case ALLOW_EDIT_RECORDS:
      return {
        ...state,
        canEdit: !state.canEdit
      }
    case DELETE_RECORD:
      return {
        ...state,
        records: state.records.filter(record => record.year !== action.recordYear),
        canEdit: false
      }
    case RECORDS_PAGE_UNLOADED:
      return defaultState
    default:
  }
  return state
}

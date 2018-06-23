import { SELECT_COMPANY, RECORDS_PAGE_UNLOADED } from "../constants";

const defaultState = {
  company: null
}

export default (state=defaultState, action) => {
  switch(action.type){
    case SELECT_COMPANY:
      return {
        ...state,
        company: action.company
      }
    case RECORDS_PAGE_UNLOADED:
      return defaultState
    default:
  }
  return state
}

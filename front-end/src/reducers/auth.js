import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  ASYNC_START,
  CLEAN_ERROR
} from '../constants'

const defaultState = {
  username: '',
  password: ''
}

export default (state=defaultState, action) => {
  switch(action.type){
    case UPDATE_FIELD_AUTH:
      return {
        ...state,
        [action.key]: action.value
      }
    case LOGIN:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      }
    case ASYNC_START:
      if(action.subtype === LOGIN){
        return {
          ...state,
          inProgress: true
        }
      }
      break;
    case CLEAN_ERROR:
      return {
        ...state,
        errors: null
      }
    default:
  }
  return state
}

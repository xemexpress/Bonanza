import {
  APP_NAME,
  APP_LOADED,
  LOGIN,
  REDIRECT
} from '../constants'

const defaultState = {
  appName: APP_NAME,
  token: null
}

export default (state=defaultState, action) => {
  switch(action.type){
    case APP_LOADED:
      return {
        ...state,
        appLoaded: true,
        token: action.token ? action.error ? null : action.payload.user.token : null,
        currentUser: action.payload ? action.error ? null : action.payload.user : null
      }
    case LOGIN:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      }
    case REDIRECT:
      return { ...state, redirectTo: null }
    default:
  }
  return state
}

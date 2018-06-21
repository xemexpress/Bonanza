import {
  APP_NAME,
  APP_LOADED,
  LOGIN,
  LOGOUT,
  REDIRECT,
  JUMPSTART,
  SUBMIT_ARTICLE
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
        redirectTo: action.error ? null : '/companies',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      }
    case REDIRECT:
      return { ...state, redirectTo: null }
    case LOGOUT:
      return {
        ...state,
        redirectTo: '/',
        token: null,
        currentUser: null
      }
    case JUMPSTART:
      return {
        ...state,
        redirectTo: action.pathname
      }
    case SUBMIT_ARTICLE:
      if(action.error){
        return state
      }
      return {
        ...state,
        redirectTo: '/'
      }
    default:
  }
  return state
}

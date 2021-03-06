import agent from './agent'

import {
  ASYNC_START,
  LOGIN,
  LOGOUT,
  APP_LOADED
} from './constants'

const promiseMiddleware = store => next => action => {
  if(isPromise(action.payload)){
    store.dispatch({ type: ASYNC_START, subtype: action.type })
    
    action.payload.then(
      res => {
        action.payload = res
        store.dispatch(action)
      },
      error => {
        action.error = true
        action.payload = error.response.body
        store.dispatch(action)
      }
    )

    return
  }

  next(action)
}

function isPromise(v){
  return v && typeof v.then === 'function'
}

const localStorageMiddleware = store => next => action => {
  if((action.type === APP_LOADED && action.payload) || action.type === LOGIN){
    if(!action.error){
      window.localStorage.setItem('jwt', action.payload.user.token)
      agent.setToken(action.payload.user.token)
    }else{
      window.localStorage.setItem('jwt', '')
      agent.setToken(null)
    }
  }else if(action.type === LOGOUT){
    window.localStorage.setItem('jwt', '')
    window.localStorage.setItem('exchangeRates', '')
    window.localStorage.setItem('exchangeRatesUpdatedAt', '')
    agent.setToken(null)
  }

  next(action)
}

export {
  localStorageMiddleware,
  promiseMiddleware
}

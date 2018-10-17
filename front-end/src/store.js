import { combineReducers, applyMiddleware, createStore } from 'redux'

import common from './reducers/common'
import auth from './reducers/auth'
import articleList from './reducers/articleList'
import articleEditor from './reducers/articleEditor'
import companyList from './reducers/companyList'
import companyEditor from './reducers/companyEditor'
import recordList from './reducers/recordList'
import recordEditor from './reducers/recordEditor'
import sodium from './reducers/sodium'
import xSodium from './reducers/xSodium'
import dSodium from './reducers/dSodium'

import { localStorageMiddleware, promiseMiddleware } from './middleware'

const reducer = combineReducers({
  common,
  auth,
  articleList,
  articleEditor,
  companyList,
  companyEditor,
  recordList,
  recordEditor,
  sodium,
  xSodium,
  dSodium
})

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware)

const store = createStore(reducer, middleware)

export default store

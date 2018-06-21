import { combineReducers, applyMiddleware, createStore } from 'redux'

import common from './reducers/common'
import auth from './reducers/auth'
import articleList from './reducers/articleList'
import articleEditor from './reducers/articleEditor'
import companyList from './reducers/companyList'
import recordList from './reducers/recordList'
import { localStorageMiddleware, promiseMiddleware } from './middleware'

const reducer = combineReducers({
  common,
  auth,
  articleList,
  articleEditor,
  companyList,
  recordList,
})

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware)

const store = createStore(reducer, middleware)

export default store

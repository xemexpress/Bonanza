import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

import {
  API_ROOT,
  PER_PAGE
} from './constants'

const superagent = superagentPromise(_superagent, global.Promise)

const responseBody = res => res.body

let token = null
const tokenPlugin = req => {
  if(token){
    req.set('authorization', `Token ${token}`)
  }
}

const requests = {
  get: url => 
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody)
}

const limit = (count, deleted=0, page=0) => `limit=${count}&offset=${count * page - deleted}`
const omitId = article => Object.assign(article, { id: undefined })
const Articles =  {
  all: (deleted, page) => 
    requests.get(`/articles?${limit(PER_PAGE, deleted, page)}`),
  create: article =>
    requests.post('/articles', { article }),
  update: article =>
    requests.put(`/articles/${article.id}`, { article: omitId(article) }),
  delete: articleId =>
    requests.del(`/articles/${articleId}`)
}

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (username, password) =>
    requests.post('/users/login', { user: { username: username, password: password }})
}

export default {
  Articles,
  Auth,
  setToken: _token => { token = _token }
}

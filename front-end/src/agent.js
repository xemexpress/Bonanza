import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

import {
  API_ROOT,
  ARTICLES_PER_PAGE,
  COMPANIES_PER_PAGE,
  ALPHAVANTAHE_API_ROOT,
  ALPHAVANTAHE_API_KEY
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
    requests.get(`/articles?${limit(ARTICLES_PER_PAGE, deleted, page)}`),
  create: article =>
    requests.post('/articles', { article }),
  update: article =>
    requests.put(`/articles/${article.id}`, { article: omitId(article) }),
  delete: articleId =>
    requests.del(`/articles/${articleId}`)
}

const omitSymbols = company => Object.assign(company, { symbol: company.originalSymbol === company.symbol ? undefined : company.symbol, originalSymbol: undefined })
const containsName = companyName => companyName === '' ? '' : `companyName=${companyName}&`
const hasTags = tags => tags.length === 0 ? '' : `tag=${tags.join(',')}&`
const Companies = {
  all: (deleted, page, companyName='', tags='') =>
    requests.get(`/companies?${containsName(companyName)}${hasTags(tags)}${limit(COMPANIES_PER_PAGE, deleted, page)}`),
  get: symbol =>
    requests.get(`/companies/${symbol}`),
  create: company =>
    requests.post('/companies', { company }),
  update: company =>
    requests.put(`/companies/${company.originalSymbol}`, { company: omitSymbols(company) }),
  delete: symbol =>
    requests.del(`/companies/${symbol}`)
}

const omitYears = record => Object.assign(record, { year: record.originalYear === record.year ? undefined : record.year, originalYear: undefined })
const Records = {
  all: symbol =>
    requests.get(`/companies/${symbol}/records`),
  create: (symbol, record) =>
    requests.post(`/companies/${symbol}/records`, { record }),
  update: (symbol, record) =>
    requests.put(`/companies/${symbol}/records/${record.originalYear}`, { record: omitYears(record) }),
  delete: (symbol, year) =>
    requests.del(`/companies/${symbol}/records/${year}`)
}

const Financials = {
  all: symbol =>
    requests.get(`/companies/${symbol}/financials`)
}

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (username, password) =>
    requests.post('/users/login', { user: { username: username, password: password }})
}

const makeUp4 = s => '0'.repeat(4-s.length)+s
const namingConv = currency => currency === 'RMB' ? 'CNY' : currency
const XSodium = {
  getQuote: symbol =>
    superagent.get(`${ALPHAVANTAHE_API_ROOT}/query?function=GLOBAL_QUOTE&symbol=${makeUp4(symbol)}.HK&apikey=${ALPHAVANTAHE_API_KEY}`),
  getHKDFrom: currency =>
    superagent.get(`${ALPHAVANTAHE_API_ROOT}/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${namingConv(currency)}&to_currency=HKD&apikey=${ALPHAVANTAHE_API_KEY}`)
}

export default {
  Articles,
  Companies,
  Records,
  Financials,
  Auth,
  XSodium,
  setToken: _token => { token = _token }
}

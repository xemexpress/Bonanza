import {
  HOME_PAGE_LOADED
} from '../constants'

export default (state={}, action) => {
  switch(action.type){
    case HOME_PAGE_LOADED:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount
      }
    default:
    break
  }
  return state
}

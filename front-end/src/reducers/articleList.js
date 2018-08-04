import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  ALLOW_EDIT_ARTICLES,
  DELETE_ARTICLE
} from '../constants'

const defaultState = {
  canEdit: false
}

export default (state=defaultState, action) => {
  switch(action.type){
    case HOME_PAGE_LOADED:
      return {
        ...state,
        articles: (state.articles || []).concat(action.payload.articles),
        articlesCount: action.payload.articlesCount
      }
    case HOME_PAGE_UNLOADED:
      return defaultState
    case ALLOW_EDIT_ARTICLES:
      return {
        ...state,
        canEdit: !state.canEdit
      }
    case DELETE_ARTICLE:
      const articleId = action.articleId
      return {
        ...state,
        articlesDeleted: (state.articlesDeleted || 0) + 1,       
        articles: state.articles.filter(article => article.id !== articleId),
        canEdit: false
      }
    default:
  }
  return state
}

import {
  UPDATE_FIELD_ARTICLE_EDITOR,
  SUBMIT_ARTICLE,
  ASYNC_START,
  CLEAN_ERROR,
  ARTICLE_EDITOR_PAGE_UNLOADED,
  ARTICLE_EDITOR_PAGE_LOADED
} from '../constants'

const defaultState = {
  id: null,
  title: '',
  body: '',
  image: ''
}

export default (state=defaultState, action) => {
  switch(action.type){
    case ARTICLE_EDITOR_PAGE_LOADED:
      return {
        ...state,
        id: action.article.id,
        title: action.article.title,
        body: action.article.body,
        image: action.article.image || ''
      }
    case UPDATE_FIELD_ARTICLE_EDITOR:
      return {
        ...state,
        [action.key]: action.value
      }
    case ASYNC_START:
      if(action.subtype === SUBMIT_ARTICLE){
        return {
          ...state,
          inProgress: true
        }
      }
      break
    case SUBMIT_ARTICLE:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      }
    case CLEAN_ERROR:
      return {
        ...state,
        errors: null
      }
    case ARTICLE_EDITOR_PAGE_UNLOADED:
      return defaultState
    default:
  }
  return state
}

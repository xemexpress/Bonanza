import {
  SUBMIT_COMPANY,
  ASYNC_START,
  UPDATE_FIELD_COMPANY_EDITOR,
  COMPANY_EDITOR_PAGE_UNLOADED,
  CLEAN_ERROR,
  ADD_TAG,
  REMOVE_TAG,
  COMPANY_EDITOR_PAGE_LOADED
} from '../constants'

const defaultState = {
  updatedAt: null,
  symbol: '',
  name: '',
  abbr: '',
  logo: '',
  link: '',
  tagInput: '',
  tagList: []
}

export default (state=defaultState, action) => {
  switch(action.type){
    case COMPANY_EDITOR_PAGE_LOADED:
      return {
        ...state,
        updatedAt: action.company.updatedAt,
        originalSymbol: action.company.symbol,
        symbol: action.company.symbol,
        name: action.company.name,
        abbr: action.company.abbr,
        logo: action.company.logo === 'https://static.productionready.io/images/smiley-cyrus.jpg' ? '' : action.company.logo,
        link: action.company.link || '',
        tagList: action.company.tagList || []
      }
    case UPDATE_FIELD_COMPANY_EDITOR:
      return {
        ...state,
        [action.key]: action.value
      }
    case ADD_TAG:
      if(state.tagList.indexOf(state.tagInput) !== -1){
        return {
          ...state,
          errors: { "The tag": "is duplicated." }
        }
      }
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      }
    case REMOVE_TAG:
      let tags = state.tagList.slice()
      tags.splice(action.index, 1)
      return {
        ...state,
        tagList: tags
      }
    case SUBMIT_COMPANY:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      }
    case ASYNC_START:
      if(action.subtype === SUBMIT_COMPANY){
        return {
          ...state,
          inProgress: true
        }
      }
      break
    case CLEAN_ERROR:
      return {
        ...state,
        errors: null
      }
    case COMPANY_EDITOR_PAGE_UNLOADED:
      return defaultState
    default:
  }
  return state
}

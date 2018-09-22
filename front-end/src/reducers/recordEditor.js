import {
  RECORD_EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_RECORD_EDITOR,
  REMOVE_KEY,
  SUBMIT_RECORD,
  ASYNC_START,
  CLEAN_ERROR,
  DEFAULT_DEEDS_PER_RECORD_EDITOR,
  DEFAULT_SEGS_PER_RECORD_EDITOR,
  RECORD_EDITOR_PAGE_LOADED
} from '../constants'

const defaultState = {
  year: '',
  grossProfitMargin: 0,
  actionsDone: Array(DEFAULT_DEEDS_PER_RECORD_EDITOR).fill(''),
  plans: Array.from({ length: DEFAULT_DEEDS_PER_RECORD_EDITOR }, () => ({ plan: '', executed: '' })),
  businessSegments: Array.from({ length: DEFAULT_SEGS_PER_RECORD_EDITOR }, () => ({ business: '', grossProfitMargin: '', share: '' })),
  keyList: []
}

export default (state=defaultState, action) => {
  switch(action.type){
    case RECORD_EDITOR_PAGE_LOADED:
      return {
        ...state,
        originalYear: action.record.year,
        year: action.record.year,
        grossProfitMargin: action.record.grossProfitMargin,
        actionsDone: action.record.actionsDone
                    .concat(action.record.actionsDone.length < DEFAULT_DEEDS_PER_RECORD_EDITOR ?
                            Array(DEFAULT_DEEDS_PER_RECORD_EDITOR - action.record.actionsDone.length).fill('')
                            : []),
        plans: action.record.plans
              .concat(action.record.plans.length < DEFAULT_DEEDS_PER_RECORD_EDITOR ?
                      Array.from({ length: DEFAULT_DEEDS_PER_RECORD_EDITOR - action.record.plans.length }, () => ({ plan: '', executed: '' }))
                      : []),
        businessSegments: action.record.businessSegments
                          .concat(action.record.businessSegments.length < DEFAULT_SEGS_PER_RECORD_EDITOR ?
                                  Array.from({ length: DEFAULT_SEGS_PER_RECORD_EDITOR - action.record.businessSegments.length }, () => ({ business: '', grossProfitMargin: '', share: '' }))
                                  : []),
        keyList: action.record.keyList
      }
    case UPDATE_FIELD_RECORD_EDITOR:
      return {
        ...state,
        [action.key]: action.value
      }
    case REMOVE_KEY:
      let keys = state.keyList.slice()
      keys.splice(action.index, 1)
      return {
        ...state,
        keyList: keys
      }
    case SUBMIT_RECORD:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      }
    case ASYNC_START:
      if(action.subtype === SUBMIT_RECORD){
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
    case RECORD_EDITOR_PAGE_UNLOADED:
      defaultState.plans = Array.from({ length: DEFAULT_DEEDS_PER_RECORD_EDITOR }, () => ({ plan: '', executed: '' }))
      defaultState.businessSegments = Array.from({ length: DEFAULT_SEGS_PER_RECORD_EDITOR }, () => ({ business: '', grossProfitMargin: '', share: '' }))
      return defaultState
    default:
  }

  return state
}

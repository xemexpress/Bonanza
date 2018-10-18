import {
  UNLOAD_SODIUM,
  TOGGLE_SCHART
} from "../constants"

const defaultState = {
  showCosts: false,
  showNetAssetValuesPerShare: false
}

export default (state=defaultState, action) => {
  switch(action.type){
    case TOGGLE_SCHART:
      if(action.schart === 'dCosts'){
        return {
          ...state,
          showCosts: !state.showCosts
        }
      }
      if(action.schart === 'dNetAssetValuesPerShare'){
        return {
          ...state,
          showNetAssetValuesPerShare: !state.showNetAssetValuesPerShare
        }
      }
      break
    case UNLOAD_SODIUM:
      return defaultState
    default:
  }

  return state
}

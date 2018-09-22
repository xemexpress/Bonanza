import React from 'react'
import { connect } from 'react-redux'

import './SodiumController.css'

import {
  SWITCH_SODIUM
} from '../../../../constants'

const mapDispatchToProps = dispatch => ({
  onSodium: () => dispatch({
    type: SWITCH_SODIUM
  })
})

const SodiumController = props => {
  let controllerClassName = 'sodium-controller'.concat(props.loaded ? ' follow' : '')
  
  let buttonClassName = 'btn btn-outline-essential'
                          .concat(props.canEdit || props.isSodium ? '' : ' invisible')
                          .concat(props.isSodium ? ' selected' : '')
  
  let switchSodium = ev => {
    ev.preventDefault()

    props.onSodium()
  }

  return (
    <div className={controllerClassName}>
      <button className={buttonClassName} onClick={switchSodium}>
        Na
      </button>
    </div>
  )
}

export default connect(()=>({}), mapDispatchToProps)(SodiumController)

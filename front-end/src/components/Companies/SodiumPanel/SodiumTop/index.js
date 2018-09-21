import React from 'react'

import Counter from './Counter'
import Checkmark from './Checkmark'

import './SodiumTop.css'

const SodiumTop = props => {
  return (
    <div className="sodium-top">
      <Counter number={props.numberOfSelected} />
      <Checkmark selected={props.numberOfSelected > 0} />
    </div>
  )
}

export default SodiumTop

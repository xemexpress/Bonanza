import React from 'react'

import Counter from './Counter'
import Checkmark from './Checkmark'

import './SConfirm.css'

const SConfirm = props => {
  return (
    <div className='sodium-confirm'>
      <Counter number={props.number} />
      <Checkmark selected={props.number > 0} loaded={props.loaded} />
    </div>
  )
}

export default SConfirm

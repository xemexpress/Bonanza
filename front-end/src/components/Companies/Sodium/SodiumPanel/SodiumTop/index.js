import React from 'react'

import Counter from './Counter'
import Checkmark from './Checkmark'

import './SodiumTop.css'

const SodiumTop = props => {
  return (
    <div className="sodium-top">
      <div>
        <Counter number={props.selectedCompanies.length} />
        <Checkmark
          selected={props.selectedCompanies.length > 0}
          loaded={props.loaded} />
      </div>
    {
      props.loaded && props.selectedCompanies.length === 1 ?
      <div>
        {props.selectedCompanies[0].name}
      </div>
      : null
    }
    </div>
  )
}

export default SodiumTop

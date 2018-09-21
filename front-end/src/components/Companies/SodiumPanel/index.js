import React from 'react'

import SodiumTop from './SodiumTop'

import './SodiumPanel.css'

const SodiumPanel = props => {
  let className = 'sodium-panel interaction-card'.concat(props.isSodium ? ' show-up' : '')

  return (
    <div className={className}>
      <SodiumTop numberOfSelected={props.soCompanies.length} />
    </div>
  )
}

export default SodiumPanel

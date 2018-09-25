import React from 'react'

import SConfirm from './SConfirm'
import SProfile from './SProfile'

const SodiumTop = props => {
  return (
    <div className="sodium-top">
      <SConfirm
        loaded={props.loaded}
        number={props.selectedCompanies.length} />
      <SProfile
        loaded={props.loaded}
        company={props.selectedCompanies.length === 1 ? props.selectedCompanies[0] : null} />
    </div>
  )
}

export default SodiumTop

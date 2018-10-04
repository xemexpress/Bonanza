import React from 'react'

import SConfirm from './SConfirm'
import SProfiles from './SProfiles'

const SodiumTop = props => {
  return (
    <div className="sodium-top">
      <SConfirm
        loaded={props.loaded}
        number={props.selectedCompanies.length} />
      <SProfiles
        loaded={props.loaded}
        selectedCompanies={props.selectedCompanies} />
    </div>
  )
}

export default SodiumTop

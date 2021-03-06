import React from 'react'

import Cloak from '../../../common/Cloak'
import SodiumController from '../SodiumController'
import SodiumTop from './SodiumTop'
import SodiumCharts from './SodiumCharts'

import './SodiumPanel.css'

const SodiumPanel = props => {
  let className = 'sodium-panel interaction-card'
                    .concat(props.loaded ? ''
                          : props.isSodium ? props.inProgress ? ' partial in-progress' : ' partial'
                          : ' hidden')

  return (
    <div className={className}>
      <Cloak visibleCondition={props.loaded} inTime={.3} outTime={.1}>
        <SodiumController
          canEdit={true}
          isSodium={props.isSodium}
          loaded={true} />
      </Cloak>
      <SodiumTop
        loaded={props.loaded}
        selectedCompanies={props.selectedCompanies} />
      <SodiumCharts
        loaded={props.loaded}
        selectedCompanies={props.selectedCompanies}
        financialsList={props.financialsList} />
    </div>
  )
}

export default SodiumPanel

import React from 'react'
import { connect } from 'react-redux'

import SodiumController from './SodiumController'
import SodiumPanel from './SodiumPanel'
import Cloak from '../../common/Cloak';

const mapStateToProps = state => ({
  ...state.sodium
})

const Sodium = props => {
  return (
    <React.Fragment>
      <Cloak visibleCondition={!props.loaded} inTime={.1} outTime={.3}>
        <SodiumController
          canEdit={props.canEdit}
          isSodium={props.isSodium}
          loaded={false} />
      </Cloak>
      <SodiumPanel
        isSodium={props.isSodium}
        loaded={props.loaded}
        inProgress={props.inProgress}
        selectedCompanies={props.selectedCompanies}
        financialsList={props.financialsList} />
    </React.Fragment>
  )
}

export default connect(mapStateToProps, ()=>({}))(Sodium)

import React from 'react'
import { connect } from 'react-redux'

import SProfile from './SProfile'

import './SProfiles.css'

const mapStateToProps = state => ({
  financialsList: state.sodium.financialsList,
  quotes: state.xSodium.quotes
})

const SProfiles = props => {
  if(!props.loaded){ return null }
    
  return (
    <div className='s-profiles'>
    {
      props.selectedCompanies.map(
        (selectedCompany, i) =>
        <SProfile
          company={selectedCompany}
          financials={props.financialsList[i]}
          quote={props.quotes[i]}
          key={i} />
      )
    }
    </div>
  )
}

export default connect(mapStateToProps, ()=>({}))(SProfiles)

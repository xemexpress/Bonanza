import React from 'react'

import ArticlesView from './ArticlesView'
import CompanyListView from './CompanyListView'
import RecordsView from './RecordsView'

const LoggedInView = props => {
  if(!props.currentUser){ return null }
  
  let selected = props.company !== null
  return (
    <React.Fragment>
      <ArticlesView
        selectedCompany={selected}
        locationHash={props.locationHash}
        currentUser={props.currentUser} />
      <CompanyListView
        selectedCompany={selected}
        locationHash={props.locationHash}
        currentUser={props.currentUser} />
      <RecordsView
        company={props.company}
        locationHash={props.locationHash} />
    </React.Fragment>
  )
}

export default LoggedInView

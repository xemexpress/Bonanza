import React from 'react'

import CompanyListView from './CompanyListView'
import RecordsView from './RecordsView'

const LoggedInView = props => {
  if(props.currentUser){
    return (
      <React.Fragment>
        <CompanyListView selectedCompany={props.company} />
        <RecordsView selectedCompany={props.company} />
      </React.Fragment>
    )
  }

  return null
}

export default LoggedInView

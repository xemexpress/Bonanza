import React from 'react'

import ArticlesView from './ArticlesView'
import CompanyListView from './CompanyListView'
import RecordsView from './RecordsView'

const LoggedInView = props => {
  if(props.currentUser){
    let selected = props.company !== null
    return (
      <React.Fragment>
        <ArticlesView
          currentUser={props.currentUser}
          locationHash={props.locationHash} 
          selectedCompany={selected} />
        <CompanyListView
          currentUser={props.currentUser}
          locationHash={props.locationHash} 
          selectedCompany={selected} />
        <RecordsView company={props.company} />
      </React.Fragment>
    )
  }

  return null
}

export default LoggedInView

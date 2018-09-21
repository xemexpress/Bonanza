import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import CompanyList from './CompanyList'
import SodiumController from './SodiumController'
import SodiumPanel from './SodiumPanel'
import agent from '../../agent'

import {
  COMPANIES_PAGE_LOADED,
  COMPANIES_PAGE_UNLOADED
} from '../../constants'

const mapStateToProps = state => ({
  ...state.companyList,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({
    type: COMPANIES_PAGE_LOADED,
    payload
  }),
  onUnload: () => dispatch({
    type: COMPANIES_PAGE_UNLOADED
  })
})

class Companies extends React.Component {
  componentWillMount(){
    if(this.props.currentUser){
      this.props.onLoad(agent.Companies.all())
    }
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    if(!this.props.currentUser){ return <Redirect to='/' /> }
    
    return (
      <React.Fragment>
        <div className="row">
          <div className="offset-lg-1 col-lg-10 col-md-12 col-xs-12 col-sm-12">
            <CompanyList
              search={this.props.search}
              tag={this.props.tag}
              companies={this.props.companies}
              companiesCount={this.props.companiesCount}
              companiesDeleted={this.props.companiesDeleted} />
          </div>
        </div>
        <SodiumController
          canEdit={this.props.canEdit}
          isSodium={this.props.isSodium} />
        <SodiumPanel
          isSodium={this.props.isSodium}
          soCompanies={this.props.soCompanies} />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Companies)

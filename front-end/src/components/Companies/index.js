import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ScrollLock from 'react-scrolllock'

import CompanyList from './CompanyList'
import Sodium from './Sodium'
import agent from '../../agent'

import {
  COMPANIES_PAGE_LOADED,
  COMPANIES_PAGE_UNLOADED
} from '../../constants'

const mapStateToProps = state => ({
  ...state.companyList,
  sodiumLoaded: state.sodium.loaded,
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
      {
        this.props.sodiumLoaded ?
        <ScrollLock accountForScrollbars={false} />
        : null
      }
        <div className="row">
          <div className="offset-lg-1 col-lg-10 col-md-12 col-xs-12 col-sm-12">
            <CompanyList
              search={this.props.search}
              tag={this.props.tag}
              companies={this.props.companies}
              companiesCount={this.props.companiesCount}
              companiesDeleted={this.props.companiesDeleted}
              sodiumLoaded={this.props.sodiumLoaded} />
          </div>
        </div>
        <Sodium canEdit={this.props.canEdit} />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Companies)
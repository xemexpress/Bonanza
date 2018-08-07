import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import HeaderSearch from './HeaderSearch'
import UsernameSpan from '../common/UsernameSpan'
import SaveButton from '../common/SaveButton'
import Overlay from '../common/Overlay'
import UserControll from '../common/UserControll'
import agent from '../../../../agent'

import {
  ZA_LOGO,
  SUBMIT_COMPANY,
  THE_TAG
} from '../../../../constants'

const mapStateToProps = state => ({
  ...state.companyEditor,    // For saving a company
  allowEdit: state.companyList.canEdit
})

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch({
    type: SUBMIT_COMPANY,
    payload
  })
})

class CompanyListView extends React.Component {
  constructor(){
    super()

    this.submitForm = (symbol, name, abbr, logo, link, tagList) => ev => {
      ev.preventDefault()

      const company = { symbol, name, abbr, logo, link, tagList }
      const originalSymbol = { originalSymbol: this.props.originalSymbol }

      let payload = this.props.originalSymbol ?
                    agent.Companies.update(Object.assign(company, originalSymbol))
                    : agent.Companies.create(company)
      this.props.onSubmit(payload)
    }
  }

  render(){
    if(this.props.selectedCompany || ((this.props.locationHash !== '#/companies' && !this.props.locationHash.startsWith('#/companyEditor')) || !this.props.currentUser)){ return null }

    if(this.props.locationHash === '#/companies'){
      return (
        <React.Fragment>
          {/* Left Section */}
          <Link className="left-layout" to='/'>
            <img src={ZA_LOGO} height="20px" alt='Bonanza' />
          </Link>
  
          {/* Middle Section */}
          <div className="nav-item middle-layout header-search">
            <HeaderSearch />
          </div>
  
          {/* Right Section */}
          <div className="nav-item right-layout username">
            <UsernameSpan username={this.props.currentUser.username} />
            <Overlay allowEdit={this.props.allowEdit}>
              <UserControll
                addNewTo="/companyEditor"
                switchTag={THE_TAG} />
            </Overlay>
          </div>
        </React.Fragment>
      )
    }

    if(this.props.locationHash.startsWith('#/companyEditor')){
      let { symbol, name, abbr, logo, link, tagList } = this.props
      
      return (
        <React.Fragment>
          {/* Left Section */}
          <Link className="left-layout" to='/companies'>
            <i className="far fa-arrow-alt-circle-left fa-lg"></i>
          </Link>
  
          {/* Middle Section */}
          <div className="nav-item">
            { this.props.originalSymbol ? null : 'New Company' }
          </div>
  
          {/* Right Section */}
          <div className="nav-item right-layout">
            <SaveButton
              inProgress={this.props.inProgress}
              onSave={this.submitForm(symbol, name, abbr, logo, link, tagList)} />
          </div>
        </React.Fragment>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyListView)

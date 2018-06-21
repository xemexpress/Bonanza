import React from 'react'
import { Link } from 'react-router-dom'

import HeaderSearch from './HeaderSearch'
import UsernameSpan from '../common/UsernameSpan'
import UserControll from '../common/UserControll'

import {
  ZA_LOGO
} from '../../../../constants'

const CompanyListView = props => {
  if(props.selectedCompany || props.locationHash !== '#/companies'){ return null }

  return (
    <React.Fragment>
      {/* Left Section */}
      <Link className="left-layout" to="/">
        <img src={ZA_LOGO} height="20px" alt='Bonanza' />
      </Link>

      {/* Middle Section */}
      <div className="nav-item middle-layout header-search">
        <HeaderSearch />
      </div>

      {/* Right Section */}
      <div className="nav-item right-layout username">
        <UsernameSpan username={props.currentUser.username} />
        <div className="overlay">
          <UserControll
            addNew="companyEditor" />
        </div>
      </div>
    </React.Fragment>
  )
}

export default CompanyListView

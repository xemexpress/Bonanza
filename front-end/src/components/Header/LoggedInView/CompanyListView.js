import React from 'react'
import { Link } from 'react-router-dom'

import LogOutButton from './LogOutButton'

import {
  ZA_LOGO
} from '../../../constants'

const CompanyListView = props => {
  if(props.selectedCompany){ return null }

  if(props.locationHash === '#/companies'){
    return (
      <React.Fragment>
        {/* Left Section */}
        <Link className="left-layout" to="/">
          <img src={ZA_LOGO} height="20px" alt={props.appName} />
        </Link>
  
        {/* Middle Section */}
        <div className="nav-item middle-layout header-search">
          <form>
            <i className="fas fa-search"></i>
            <input className="search-company" type="text" placeholder="Search" />
          </form>
        </div>
  
        {/* Right Section */}
        <div className="nav-item right-layout username">
          { props.currentUser.username === 'unimemo' ? <span>&nbsp;UniMemo&nbsp;</span> : props.currentUser.username }
          <div className="overlay">
            <div className="operations">
              <button className="btn btn-outline-info"><i className="far fa-edit fa-lg"></i></button>
              <LogOutButton />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
  
  return (
    <React.Fragment>
      {/* Left Section */}
      <Link className="nav-item left-layout" to="/companies">
        <i className="far fa-arrow-alt-circle-left fa-lg" style={{color: "#24292e !important"}}></i>
      </Link>


      {/* Middle Section */}
      <div className="nav-item middle-layout header-search">
      { null }
      </div>

      {/* Right Section */}
      <div className="nav-item right-layout username">
        { props.currentUser.username === 'unimemo' ? <span>&nbsp;UniMemo&nbsp;</span> : props.currentUser.username }
        <div className="overlay">
          <div className="operations">
            <button className="btn btn-outline-info"><i className="far fa-edit fa-lg"></i></button>
            <button className="btn btn-outline-positive"><i className="far fa-plus-square fa-lg"></i></button>
            <LogOutButton />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CompanyListView

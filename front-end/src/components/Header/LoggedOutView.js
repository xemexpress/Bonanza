import React from 'react'
import { Link } from 'react-router-dom'

import {
  ZA_LOGO
} from '../../constants'

const LoggedOutView = props => {
  if(props.currentUser){ return null }
  
  return (
    <React.Fragment>
      <Link className="left-layout" to="/">
        <img src={ZA_LOGO} height="20px" alt={props.appName} />
      </Link>
      <Link className={ window.location.hash === '#/login' ? 'nav-item selected' : 'nav-item'} to="/login">
        Sign In
      </Link>
    </React.Fragment>
  )
}

export default LoggedOutView

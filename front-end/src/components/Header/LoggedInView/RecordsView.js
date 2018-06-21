import React from 'react'

import UserControll from './common/UserControll'

import {
  UNIMEMO_LOGO
} from '../../../constants'

const RecordsView = props => {
  if(!props.company){ return null }

  return (
    <React.Fragment>
      {/* Left Section */}
      <a className="left-layout">
        <img src={UNIMEMO_LOGO} height="20px" style={{ borderRadius: "50%", border: "1px solid #586069" }} alt={props.appName} />
      </a>

      {/* Middle Section */}
      <div className="nav-item middle-layout company-name">
        <a href="https://github.com/xemexpress/UniMemo" target="_blank" rel="noopener noreferrer">次誠集團</a>
      </div>

      {/* Right Section */}
      <div className="nav-item right-layout">
        <UserControll
          addNew="recordEditor"
          jumpstartTo="/companies" />
      </div>
    </React.Fragment>
  )
}

export default RecordsView

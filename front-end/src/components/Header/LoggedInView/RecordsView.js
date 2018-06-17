import React from 'react'

import {
  UNIMEMO_LOGO
} from '../../../constants'

const RecordsView = props => {
  if(props.selectedCompany){
    return (
      <React.Fragment>
        <a className="left-layout">
          <img src={UNIMEMO_LOGO} height="20px" style={{ borderRadius: "50%", border: "1px solid #586069" }} alt={props.appName} />
        </a>
        <div className="nav-item middle-layout company-name">
          <a href="https://github.com/xemexpress/UniMemo" target="_blank" rel="noopener noreferrer">次誠集團</a>
        </div>
        <div className="nav-item right-layout">
          <button className="btn btn-outline-info"><i className="far fa-edit fa-lg"></i></button>&nbsp;&nbsp;
          <button className="btn btn-outline-danger"><i className="fas fa-sign-out-alt fa-lg"></i></button>
        </div>
      </React.Fragment>
    )
  }

  return null
}

export default RecordsView

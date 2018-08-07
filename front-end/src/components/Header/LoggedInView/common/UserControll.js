import React from 'react'
import { Link } from 'react-router-dom'

import EditButton from './EditButton'
import JumpstartButton from './JumpstartButton'

const UserControll = props => {
  return (
    <div className="operations">
      <EditButton onHash={ window.location.hash } />
      &nbsp;
      <button className="btn btn-outline-positive">
        <Link to={props.addNewTo}>
          <i className="far fa-plus-square fa-lg"></i>
        </Link>
      </button>
      &nbsp;
      <JumpstartButton
        to={props.jumpstartTo}
        switchTag={props.switchTag} />
    </div>
  )
}

export default UserControll

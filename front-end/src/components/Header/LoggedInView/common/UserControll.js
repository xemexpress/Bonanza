import React from 'react'
import { Link } from 'react-router-dom'

import EditButton from './EditButton'
import JumpstartButton from './JumpstartButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserControll = props => {
  return (
    <div className="operations">
      <EditButton onHash={ window.location.hash } />
      &nbsp;
      <button className="btn btn-outline-positive">
        <Link to={props.addNewTo}>
          <FontAwesomeIcon icon={['far', 'plus-square']} size="lg" />
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

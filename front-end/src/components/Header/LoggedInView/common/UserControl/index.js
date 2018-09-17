import React from 'react'

import EditButton from './EditButton'
import AddNewButton from './AddNewButton'
import JumpstartButton from './JumpstartButton'

const UserControl = () => {
  return (
    <div className="operations">
      <EditButton onHash={window.location.hash} />
      &nbsp;
      <AddNewButton onHash={window.location.hash} />
      &nbsp;
      <JumpstartButton onHash={window.location.hash} />
    </div>
  )
}

export default UserControl

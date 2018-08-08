import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Loader = props => {
  return (
    <h4 className="loader">
      <FontAwesomeIcon icon={props.icon} /><br/>
      Loading...
    </h4>
  )
}

export default Loader

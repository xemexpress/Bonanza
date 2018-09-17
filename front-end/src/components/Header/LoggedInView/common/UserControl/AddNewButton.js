import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddNewButton = props => {
  let target = props.onHash === '#/' ? '/articleEditor'
            : props.onHash === '#/companies' ? '/companyEditor'
            : props.onHash.match(/#\/companies\/[0-9]+/g) ? '/recordEditor/'.concat(props.onHash.split('/').pop())
            : null
  return (
    <button className="btn btn-outline-positive">
      <Link to={target}>
        <FontAwesomeIcon icon={['far', 'plus-square']} size="lg" />
      </Link>
    </button>
  )
}

export default AddNewButton

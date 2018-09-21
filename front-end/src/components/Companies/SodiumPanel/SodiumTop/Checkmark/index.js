import React from 'react'

import './Checkmark.css'

const Checkmark = ({ selected }) => {
  let className = 'checkmark'.concat(selected ? ' submit' : '')

  return (
    <span className={className}></span>
  )
}

export default Checkmark

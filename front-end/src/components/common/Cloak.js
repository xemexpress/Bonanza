import React from 'react'

const Cloak = props => {
  return (
    <span
      className={props.visibleCondition ? '' : 'invisible'}
      style={{ 'transition': `opacity ${props.visibleCondition ? props.inTime : props.outTime}s ease-in-out` }}>
      {props.children}
    </span>
  )
}

export default Cloak

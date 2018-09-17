import React from 'react'

const Overlay = props => {
  return (
    <div className="overlay" style={props.canEdit ? { opacity: '1', zIndex: '1' } : null}>
      {props.children}
    </div>
  )
}

export default Overlay

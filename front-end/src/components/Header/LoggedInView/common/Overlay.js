import React from 'react'

const Overlay = props => {
  return (
    <div className="overlay" style={props.allowEdit ? { opacity: '1', zIndex: '1' } : null}>
      {props.children}
    </div>
  )
}

export default Overlay

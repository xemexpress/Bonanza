import React from 'react'

const Loader = props => {
  return (
    <h4 className="loader">
      <i className={props.icon}></i><br/>
      Loading...
    </h4>
  )
}

export default Loader

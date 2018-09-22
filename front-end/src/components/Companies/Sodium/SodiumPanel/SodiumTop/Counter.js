import React from 'react'

const Counter = props => {
  let markedUp = { __html: 'Total:' + '&nbsp;'.repeat(4-String(props.number).length).concat(String(props.number)) }
  
  return (
    <span style={{ cursor: 'default' }} dangerouslySetInnerHTML={markedUp}></span>
  )
}

export default Counter

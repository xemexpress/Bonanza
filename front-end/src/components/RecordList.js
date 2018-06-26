import React from 'react'

import Record from './Record'

const RecordList = props => {
  if(!props.records){
    return (
      <h4 className="loader">
        <i className="fab fa-earlybirds"></i><br/>
        Loading...
      </h4>
    )
  }

  if(props.records.length === 0){
    return <div>No records are here...yet.</div>
  }

  return (
    props.records.map((unit, i) => {
      return <Record record={unit} key={i} />
    })
  )
}

export default RecordList

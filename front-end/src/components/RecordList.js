import React from 'react'

import Record from './Record'
import Loader from './common/Loader'

const RecordList = props => {
  if(!props.records){
    return <Loader icon="fab fa-earlybirds" />
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

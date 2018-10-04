import React from 'react'

const RButton = ({ profit, netAssetValue }) => {
  const value = profit / netAssetValue
  const present = (value*100).toPrecision(value < 1 ? 2 : 3)

  return (
    <div className='R'>
      <button className='btn btn-outline-danger'>
    {
      isNaN(value) ?
      'R ***' :
      value >= 0.3 ?
      <b>R {present}%</b>
      : `R ${present}%`
    }
      </button>
    </div>
  )
}

export default RButton

import React from 'react'

const PBButton = ({ quote, netAssetValuePerShare }) => {
  const value = quote / netAssetValuePerShare
  const present = value.toPrecision(value >= 10 ? 3 : 2)
  
  return (
    <div className='PB'>
      <button className='btn btn-outline-positive'>
      {
        !quote ?
        <span>PB ~</span>
        : value <= 0.67 ?
        <b>PB {present}</b>
        : `PB ${present}`
      }
      </button>
    </div>
  )
}

export default PBButton

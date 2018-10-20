import React from 'react'

const PEButton = ({ quote, averageEarningsPerShare }) => {
  const value = quote / averageEarningsPerShare
  const present = value.toPrecision(value >= 10 ? 3 : 2)

  return (
    <div className='PE'>
      <button className='btn btn-outline-info'>
      {
        !quote ?
        'PE ~'
        : isNaN(value) ?
        'PE ***'
        : value <= 14 ?
        <b>PE {present}</b>
        : `PE ${present}`
      }
      </button>
    </div>
  )
}

export default PEButton

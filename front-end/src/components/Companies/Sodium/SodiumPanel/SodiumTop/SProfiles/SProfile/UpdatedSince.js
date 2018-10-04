import React from 'react'

const UpdatedSince = ({ date }) => {
  let periodMap = {
    L: '03',
    M: '06',
    U: '09',
    Y: '12'
  }

  let year = date.slice(0,4)
  let month = Object.keys(periodMap).filter(symbol => periodMap[symbol] === date.slice(4))[0]
  
  return (
    <div className='updated-since'>
    { `${year}${month}` }
    </div>
  )
}

export default UpdatedSince

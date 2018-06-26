import React from 'react'

const MyTabs = props => {
  let ifSelected = symbol => props.tabState === symbol ? 'selected' : ''
  return (
    <div className="m-y-tabs">
      <span
        className={`m ${ifSelected(props.mSymbol)}`}
        onClick={props.changeMy}>
        {props.mSymbol}
      </span>
      { props.ySymbol ? '|' : null }
      {
        props.ySymbol ?
        <span
          className={`y ${ifSelected(props.ySymbol)}`}
          onClick={props.changeMy}>
          {props.ySymbol}
        </span>
        : null
      }
    </div>
  )
}

export default MyTabs

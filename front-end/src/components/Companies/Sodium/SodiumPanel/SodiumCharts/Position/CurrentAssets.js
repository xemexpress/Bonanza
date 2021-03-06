import React from 'react'
import Plot from 'react-plotly.js'

import SChart from '../common/SChart'

import {
  RECENT_SODIUM,
  COMPULSORY_MODE_BAR_BUTTONS,
  D1_COLOR,
  D2_COLOR,
  D3_COLOR,
  OTHERS_COLOR
} from '../../../../../../constants'

// https://coolors.co/91df29-e63b2e-1e91d6-ffe319-62616c

const commonProps = {
  type: 'bar'
}

class CurrentAssets extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showingRecent: true,
      data: [
        {
          name: 'Cash',
          x: this.props.years,
          y: this.props.cash,
          marker: { color: D1_COLOR },
          ...commonProps
        },
        {
          name: 'Receivables',
          x: this.props.years,
          y: this.props.receivables,
          marker: { color: D2_COLOR },
          ...commonProps
        },
        {
          name: 'Inventory',
          x: this.props.years,
          y: this.props.inventory,
          marker: { color: D3_COLOR },
          ...commonProps
        },
        {
          name: 'Others',
          x: this.props.years,
          y: this.props.others,
          marker: { color: OTHERS_COLOR },
          ...commonProps
        }
      ],
      recentData: [
        {
          name: 'Cash',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.cash.slice(-RECENT_SODIUM),
          marker: { color: D1_COLOR },
          ...commonProps
        },
        {
          name: 'Receivables',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.receivables.slice(-RECENT_SODIUM),
          marker: { color: D2_COLOR },
          ...commonProps
        },
        {
          name: 'Inventory',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.inventory.slice(-RECENT_SODIUM),
          marker: { color: D3_COLOR },
          ...commonProps
        },
        {
          name: 'Others',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.others.slice(-RECENT_SODIUM),
          marker: { color: OTHERS_COLOR },
          ...commonProps
        }
      ],
      layout: {
        barmode: 'stack',
        title: 'Current Assets',
        titlefont: {
          size: 17
        },
        margin: {
          t: 50,
          b: 24,
          l: 40,
          r: 10
        },
        autosize: true,
        legend: {
          xanchor: 'center',
          x: 0.5,
          yanchor: 'middle',
          y: 1,
          orientation: 'h',
          font: { size: 7 },
        },
        yaxis: {
          title: 'Hundred Million HKD',
          titlefont: { size: 7 },
          fixedrange: true
        }
      },
      config: {
        showtTips: false,
        displaylogo: false,
        modeBarButtons: [
          COMPULSORY_MODE_BAR_BUTTONS
        ]
      },
      style: {
        width: '100%',
        height: '100%'
      },
      useResizeHandler : true
    }
  }

  render(){
    const { data, recentData, layout, config, style, useResizeHandler, showingRecent } = this.state
    
    return (
      <SChart>
        <Plot
          data={showingRecent ? recentData : data}
          layout={layout}
          config={config}
          style={style}
          onDoubleClick={() => this.setState({ showingRecent: !showingRecent })}
          useResizeHandler={useResizeHandler} />
      </SChart>
    )
  }
}

export default CurrentAssets

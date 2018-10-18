import React from 'react'
import { connect } from 'react-redux'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'

import SChart from './SChart'

import {
  TOGGLE_SCHART,
  RECENT_SODIUM,
  CURRENT_ASSET_COLOR,
  CURRENT_LIABILITY_COLOR,
  NON_CURRENT_ASSET_COLOR,
  NON_CURRENT_LIABILITY_COLOR,
  COMPULSORY_MODE_BAR_BUTTONS
} from '../../../../../constants'

// https://coolors.co/export/copic/000000-f79256-fbd1a2-7dcfb6-00b2ca

const mapDispatchToProps = dispatch => ({
  onToggleSChart: () => dispatch({
    type: TOGGLE_SCHART,
    schart: 'dNetAssetValuesPerShare'
  })
})

const commonProps = {
  type: 'bar'
}

class Position extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showingRecent: true,
      data: [
        {
          name: 'Current Assets',
          x: this.props.years,
          y: this.props.currentAssets,
          marker: { color: CURRENT_ASSET_COLOR },
          ...commonProps
        },
        {
          name: 'Current Liabilities',
          x: this.props.years,
          y: this.props.currentLiabilities.map(val => -val),
          marker: { color: CURRENT_LIABILITY_COLOR },
          ...commonProps
        },
        {
          name: 'Non-current Assets',
          x: this.props.years,
          y: this.props.nonCurrentAssets,
          marker: { color: NON_CURRENT_ASSET_COLOR },
          ...commonProps
        },
        {
          name: 'Non-current Liabilities',
          x: this.props.years,
          y: this.props.nonCurrentLiabilities.map(val => -val),
          marker: { color: NON_CURRENT_LIABILITY_COLOR },
          ...commonProps
        },
      ],
      recentData: [
        {
          name: 'Current Assets',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.currentAssets.slice(-RECENT_SODIUM),
          marker: { color: CURRENT_ASSET_COLOR },
          ...commonProps
        },
        {
          name: 'Current Liabilities',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.currentLiabilities.slice(-RECENT_SODIUM).map(val => -val),
          marker: { color: CURRENT_LIABILITY_COLOR },
          ...commonProps
        },
        {
          name: 'Non-current Assets',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.nonCurrentAssets.slice(-RECENT_SODIUM),
          marker: { color: NON_CURRENT_ASSET_COLOR },
          ...commonProps
        },
        {
          name: 'Non-current Liabilities',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.nonCurrentLiabilities.slice(-RECENT_SODIUM).map(val => -val),
          marker: { color: NON_CURRENT_LIABILITY_COLOR },
          ...commonProps
        }
      ],
      layout: {
        barmode: 'relative',
        title: 'Position',
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
          titlefont: { size: 7 }
        },
        bargap: 0.04
      },
      config: {
        showtTips: false,
        displaylogo: false,
        modeBarButtons: [
          COMPULSORY_MODE_BAR_BUTTONS,
          [{
            name: 'Net Asset Value per share',
            icon: Plotly.Icons.zoombox,
            click: this.props.onToggleSChart
          }]
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
    return (
      <SChart>
        <Plot
          data={this.state.showingRecent ? this.state.recentData : this.state.data}
          layout={this.state.layout}
          config={this.state.config}
          style={this.state.style}
          onDoubleClick={() => this.setState({ showingRecent: !this.state.showingRecent })}
          useResizeHandler={this.state.useResizeHandler} />
      </SChart>
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(Position)
            
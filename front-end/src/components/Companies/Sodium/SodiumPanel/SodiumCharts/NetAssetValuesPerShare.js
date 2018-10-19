import React from 'react'
import { connect } from 'react-redux'
import Plot from 'react-plotly.js'

import SChart from './SChart'

import {
  RECENT_SODIUM,
  NET_ASSET_VALUE_COLOR,
  COMPULSORY_MODE_BAR_BUTTONS
} from '../../../../../constants'

const mapStateToProps = state => ({
  showNetAssetValuesPerShare: state.dSodium.showNetAssetValuesPerShare
})

const commonProps = {
  type: 'scatter',
  mode: 'lines+markers',
  line: { width: 1 },
  marker: { color: NET_ASSET_VALUE_COLOR, size: '4' },
  connectgaps: true
}

class NetAssetValuesPerShare extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showingRecent: true,
      data: [
        {
          name: 'Net Asset Values per share',
          x: this.props.years,
          y: this.props.netAssetValuesPerShare,
          ...commonProps
        }
      ],
      recentData: [
        {
          name: 'Net Asset Values per share',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.netAssetValuesPerShare.slice(-RECENT_SODIUM),
          ...commonProps
        }
      ],
      layout: {
        title: 'Net Asset Values per share',
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
        showlegend: false,
        yaxis: {
          title: 'HKD',
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
    if(!this.props.showNetAssetValuesPerShare){ return null }
    
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

export default connect(mapStateToProps, ()=>({}))(NetAssetValuesPerShare)

import React from 'react'
import Plot from 'react-plotly.js'

import SChart from '../common/SChart'

import {
  RECENT_SODIUM,
  NET_ASSET_VALUE_COLOR,
  COMPULSORY_MODE_BAR_BUTTONS
} from '../../../../../../constants'

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

export default NetAssetValuesPerShare

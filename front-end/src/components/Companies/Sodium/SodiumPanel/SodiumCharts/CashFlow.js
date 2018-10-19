import React from 'react'
import Plot from 'react-plotly.js'

import SChart from './SChart'

import {
  RECENT_SODIUM,
  NET_OPERATING_COLOR,
  NET_INVESTING_COLOR,
  NET_FINANCING_COLOR,
  COMPULSORY_MODE_BAR_BUTTONS
} from '../../../../../constants'

// https://coolors.co/export/copic/000000-ff8821-3e7cb1-dbe4ee-000000

const commonProps = {
  type: 'bar'
}

class CashFlow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showingRecent: true,
      data: [
        {
          name: 'Net Operating',
          x: this.props.years,
          y: this.props.netOperatings,
          marker: { color: NET_OPERATING_COLOR },
          ...commonProps
        },
        {
          name: 'Net Investing',
          x: this.props.years,
          y: this.props.netInvestings,
          marker: { color: NET_INVESTING_COLOR },
          ...commonProps
        },
        {
          name: 'Net Financing',
          x: this.props.years,
          y: this.props.netFinancings,
          marker: { color: NET_FINANCING_COLOR },
          ...commonProps
        }
      ],
      recentData: [
        {
          name: 'Net Operating',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.netOperatings.slice(-RECENT_SODIUM),
          marker: { color: NET_OPERATING_COLOR },
          ...commonProps
        },
        {
          name: 'Net Investing',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.netInvestings.slice(-RECENT_SODIUM),
          marker: { color: NET_INVESTING_COLOR },
          ...commonProps
        },
        {
          name: 'Net Financing',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.netFinancings.slice(-RECENT_SODIUM),
          marker: { color: NET_FINANCING_COLOR },
          ...commonProps
        }
      ],
      layout: {
        barmode: 'relative',
        title: 'Cash Flow',
        titlefont: {
          size: 17
        },
        margin: {
          t: 30,
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
        xaxis: { fixedrange: true },
        yaxis: {
          title: 'Hundred Million HKD',
          titlefont: { size: 7 },
          fixedrange: true
        }
      },
      config: {
        showTips: false,
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

export default CashFlow

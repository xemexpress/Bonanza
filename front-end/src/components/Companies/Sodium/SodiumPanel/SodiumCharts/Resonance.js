import React from 'react'
import { connect } from 'react-redux'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'

import {
  TOGGLE_SCHART,
  RECENT_SODIUM,
  REVENUE_COLOR,
  GROSS_PROFIT_COLOR,
  PROFIT_COLOR,
  COMPULSORY_MODE_BAR_BUTTONS
} from '../../../../../constants'

// https://coolors.co/export/copic/ffffff-98dfaf-5fb49c-414288-ffffff

const mapDispatchToProps = dispatch => ({
  onToggleSChart: () => dispatch({
    type: TOGGLE_SCHART,
    schart: 'dCosts'
  })
})

const commonProps = {
  type: 'scatter',
  mode: 'lines+markers',
  line: { width: 1 }
}

class Resonance extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showingRecent: true,
      data: [
        {
          name: 'Revenue',
          x: this.props.years,
          y: this.props.revenues,
          marker: { color: REVENUE_COLOR, size: '4' },
          ...commonProps
        },
        {
          name: 'Gross Profit',
          x: this.props.years,
          y: this.props.grossProfits,
          marker: { color: GROSS_PROFIT_COLOR, size: '4' },
          ...commonProps
        },
        {
          name: 'Profit',
          x: this.props.years,
          y: this.props.profits,
          marker: { color: PROFIT_COLOR, size: '4' },
          ...commonProps
        }
      ],
      recentData: [
        {
          name: 'Revenue',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.revenues.slice(-RECENT_SODIUM),
          marker: { color: REVENUE_COLOR, size: '4' },
          ...commonProps
        },
        {
          name: 'Gross Profit',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.grossProfits.slice(-RECENT_SODIUM),
          marker: { color: GROSS_PROFIT_COLOR, size: '4' },
          ...commonProps
        },
        {
          name: 'Profit',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.profits.slice(-RECENT_SODIUM),
          marker: { color: PROFIT_COLOR, size: '4' },
          ...commonProps
        }
      ],
      layout: {
        title: 'Resonance',
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
        yaxis: {
          title: 'Hundred Million HKD',
          titlefont: { size: 7 }
        }
      },
      config: {
        showTips: false,
        displaylogo: false,
        modeBarButtons: [
          COMPULSORY_MODE_BAR_BUTTONS,
          [{
            name: 'Costs',
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
      <Plot
        data={this.state.showingRecent ? this.state.recentData : this.state.data}
        layout={this.state.layout}
        config={this.state.config}
        style={this.state.style}
        onDoubleClick={() => this.setState({ showingRecent: !this.state.showingRecent })}
        useResizeHandler={this.state.useResizeHandler} />
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(Resonance)

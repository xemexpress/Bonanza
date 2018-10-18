import React from 'react'
import { connect } from 'react-redux'
import Plot from 'react-plotly.js'

import SChart from './SChart'

import {
  RECENT_SODIUM,
  COMPULSORY_MODE_BAR_BUTTONS
} from '../../../../../constants'

const commonProps = {
  type: 'bar'
}

const mapStateToProps = state => ({
  showCosts: state.dSodium.showCosts
})

class Costs extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showingRecent: true,
      data: [
        {
          name: 'Sales Cost',
          x: this.props.years,
          y: this.props.salesCosts,
          ...commonProps
        },
        {
          name: 'Selling Expense',
          x: this.props.years,
          y: this.props.sellingExpenses,
          ...commonProps
        },
        {
          name: 'Admin Cost',
          x: this.props.years,
          y: this.props.adminCosts,
          ...commonProps
        },
        {
          name: 'Financing Cost',
          x: this.props.years,
          y: this.props.financingCosts,
          ...commonProps
        },
      ],
      recentData: [
        {
          name: 'Sales Cost',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.salesCosts.slice(-RECENT_SODIUM),
          ...commonProps
        },
        {
          name: 'Selling Expense',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.sellingExpenses.slice(-RECENT_SODIUM),
          ...commonProps
        },
        {
          name: 'Admin Cost',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.adminCosts.slice(-RECENT_SODIUM),
          ...commonProps
        },
        {
          name: 'Financing Cost',
          x: this.props.years.slice(-RECENT_SODIUM),
          y: this.props.financingCosts.slice(-RECENT_SODIUM),
          ...commonProps
        },
      ],
      layout: {
        barmode: 'stack',
        title: 'Costs',
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
    if(!this.props.showCosts){ return null }
    
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

export default connect(mapStateToProps, ()=>({}))(Costs)

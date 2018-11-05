import React from 'react'
import Plot from 'react-plotly.js'

import SChart from './common/SChart'

const desired_maximum_marker_size = 40

class SCompare extends React.Component {
  constructor(props){
    super(props)
    const common = Math.min(...this.props.yearsList.map(years => years.length))
    this.state = {
      common: common,
      showingRecent: false,
      data: [
        {
          type: 'scatter',
          mode: 'markers+text',
          text: this.props.companyInfos,
          textposition: 'middle right',
          x: this.props.resonancesList.map(resonances => resonances.slice(-common).reduce((prev, resonance, i, targetedResonances) => prev + resonance / targetedResonances.length, 0) * 100),
          y: this.props.netCashFlowsList.map(netCashFlows => netCashFlows.slice(-common).reduce((prev, netCashFlow, i, targetedNetCashFlows) => prev + netCashFlow / targetedNetCashFlows.length, 0)),
          marker: {
            size: this.props.netAssetValuesList.map(netAssetValues => netAssetValues.slice(-1)[0]),
            sizeref: 2.0 * Math.max(...this.props.netAssetValuesList.map(netAssetValues => netAssetValues.slice(-1)[0])) / (desired_maximum_marker_size**2),
            sizemode: 'area'
          }
        }
      ],
      recentData: [
        {
          type: 'scatter',
          mode: 'markers+text',
          text: this.props.companyInfos,
          textposition: 'middle right',
          x: this.props.resonancesList.map(resonances => resonances.slice(-3).reduce((prev, resonance, i, targetedResonances) => prev + resonance / targetedResonances.length, 0) * 100),
          y: this.props.netCashFlowsList.map(netCashFlows => netCashFlows.slice(-3).reduce((prev, netCashFlow, i, targetedNetCashFlows) => prev + netCashFlow / targetedNetCashFlows.length, 0)),
          marker: {
            size: this.props.netAssetValuesList.map(netAssetValues => netAssetValues.slice(-1)[0]),
            sizeref: 2.0 * Math.max(...this.props.netAssetValuesList.map(netAssetValues => netAssetValues.slice(-1)[0])) / (desired_maximum_marker_size**2),
            sizemode: 'area'
          }
        }
      ],
      layout: {
        margin: {
          t: 50,
          b: 24,
          l: 40,
          r: 10
        },
        autosize: true,
        showlegend: false,
        xaxis: {
          title: 'Resonance: %',
          titlefont: { size: 7 },
          range: [0, 100]
        },
        yaxis: {
          title: 'Net Cash Flow: Hundred Million HKD',
          titlefont: { size: 7 },
          fixedrange: true
        }
      },
      config: {
        showtTips: false,
        displaylogo: false,
        displayModeBar: false
      },
      style: {
        width: '100%',
        height: '100%'
      },
      useResizeHandler : true
    }
  }

  render(){
    const { data, recentData, layout, config, style, useResizeHandler, common, showingRecent } = this.state
    const { yearsList, companyInfos } = this.props
    
    return (
      <React.Fragment>
        <SChart>
          <Plot
            data={common >= 3 && showingRecent ? recentData : data}
            layout={layout}
            config={config}
            style={style}
            onDoubleClick={() => this.setState({ showingRecent: !showingRecent })}
            useResizeHandler={useResizeHandler} />
        </SChart>
        <div className='chart-details'>
          Comparing {common > 1 ? `${common} years` : `${common} year`} >= {yearsList[0][yearsList[0].length - common]}
          {
            companyInfos.map((companyInfo, i) => {
              return (
                <div className='chart-detail' key={i}>
                  <div>&emsp;&emsp;{companyInfo}</div>
                  <div>since {yearsList[i][0]}</div>
                </div>
              )
            })
          }
        </div>
      </React.Fragment>
    )
  }
}

export default SCompare

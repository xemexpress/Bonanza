import React from 'react'
import { connect } from 'react-redux'

import MyTabs from './common/MyTabs'
import {
  UPDATE_FIELD_RECORD_EDITOR
} from '../../constants'

const mapStateToProps = state => ({
  year: state.recordEditor.year,
  grossProfitMargin: state.recordEditor.grossProfitMargin
})

const mapDispatchToProps = dispatch => ({
  onUpdateField: (key, value) => dispatch({
    type: UPDATE_FIELD_RECORD_EDITOR,
    key,
    value
  })
})

class TimeGpmBrief extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      year: this.props.year.slice(0,4) || '',
      mY: this.props.year.slice(4) || 'M'
    }

    this.changeYear = ev => {
      ev.preventDefault()
      this.setState({ year: ev.target.value })
    }

    this.changeMy = ev => {
      ev.preventDefault()
      this.setState({ mY: ev.target.innerHTML })
    }

    this.changeYearBrief = yearBrief => this.props.onUpdateField('year', yearBrief)
    this.changeGrossProfitMargin = ev => this.props.onUpdateField('grossProfitMargin', Math.round(ev.target.value * 10) / 10) 
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.year !== this.state.year || prevState.mY !== this.state.mY){
      this.changeYearBrief(this.state.year + this.state.mY)
    }
  }

  render(){
    return (
      <div className="record-section time-gpm-brief">
        <span className="time-brief">
          <input
            className="year record-filled"
            type="number"
            min="0"
            placeholder="Year"
            onChange={this.changeYear}
            value={this.state.year} />
          <MyTabs
            changeMy={this.changeMy}
            mSymbol='M'
            ySymbol='Y'
            tabState={this.state.mY} />
        </span>
        <input
          className="gpm-brief record-filled"
          type="number"
          placeholder="GPM"
          value={this.props.grossProfitMargin || ''}
          onChange={this.changeGrossProfitMargin} />
      </div>
    )  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeGpmBrief)

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import UserControll from './common/UserControll'
import SaveButton from './common/SaveButton'
import agent from '../../../agent'

import {
  SUBMIT_RECORD,
  RECORDS_PAGE_UNLOADED,
  TOGGLE_PLAN
} from '../../../constants'

const mapStateToProps = state => ({
  ...state.recordEditor,    // For saving a record
  company: state.recordList.company
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (symbol, payload) => dispatch({
    type: SUBMIT_RECORD,
    payload,
    symbol
  }),
  onTogglePlan: () => dispatch({
    type: TOGGLE_PLAN
  }),
  onUnload: () => dispatch({
    type: RECORDS_PAGE_UNLOADED
  })
})

class RecordsView extends React.Component {
  constructor(){
    super()

    this.submitForm = (year, keyList, businessSegments, grossProfitMargin, plans, actionsDone) => ev => {
      ev.preventDefault()
      businessSegments = businessSegments.filter(segment => segment.business !== '')
      plans = plans.filter(unit => unit.plan !== '')
      actionsDone = actionsDone.filter(actionDone => actionDone !== '')

      const record = { year, keyList, businessSegments, grossProfitMargin, plans, actionsDone }
      const originalYear = { originalYear: this.props.originalYear }

      const payload = this.props.locationHash.match(/#\/recordEditor\/[0-9]+\/\d{4}[MY]/g) ?
                      agent.Records.update(this.props.company.symbol, Object.assign(record, originalYear))
                      : agent.Records.create(this.props.company.symbol, record)
      this.props.onSubmit(this.props.company.symbol, payload)
    }

    this.togglePlan = ev => {
      ev.preventDefault()
      this.props.onTogglePlan()
    }
  }

  componentWillUpdate(nextProps, nextState){
    if(!nextProps.locationHash.match(/#\/companies\/[0-9]+/g) && !nextProps.locationHash.startsWith('#/recordEditor')){
      this.props.onUnload()
    }
  }

  render(){
    if(!this.props.company || (!this.props.locationHash.match(/#\/companies\/[0-9]+/g) && !this.props.locationHash.startsWith('#/recordEditor'))){ return null }
    
    if(this.props.locationHash.match(/#\/companies\/[0-9]+/g)){
      return (
        <React.Fragment>
          {/* Left Section */}
          <a className="left-layout" onClick={this.togglePlan}>
            <img src={this.props.company.logo} height="20px" style={{ borderRadius: "50%", border: "1px solid #586069" }} alt={this.props.company.abbr} />
          </a>
  
          {/* Middle Section */}
          <div className="nav-item middle-layout company-name">
            <a href={this.props.company.link} target="_blank" rel="noopener noreferrer">{this.props.company.name}</a>
          </div>
  
          {/* Right Section */}
          <div className="nav-item right-layout">
            <UserControll
              addNewTo={`/recordEditor/${this.props.company.symbol}`}
              jumpstartTo="/companies" />
          </div>
        </React.Fragment>
      )
    }
    
    if(this.props.locationHash.startsWith('#/recordEditor')){
      const { year, keyList, businessSegments, grossProfitMargin, plans, actionsDone } = this.props
      
      return (
        <React.Fragment>
          {/* Left Section */}
          <Link className="left-layout" to={`/companies/${this.props.company.symbol}`}>
            <i className="far fa-arrow-alt-circle-left fa-lg"></i>
          </Link>
    
          {/* Middle Section */}
          <div className="nav-item">
            New Record
          </div>
    
          {/* Right Section */}
          <div className="nav-item right-layout">
            <SaveButton inProgress={this.props.inProgress} onSave={this.submitForm(year, keyList, businessSegments, grossProfitMargin, plans, actionsDone)} />
          </div>
        </React.Fragment>
      )
    }    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsView)

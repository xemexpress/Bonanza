import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import UserControl from './common/UserControl'
import SaveButton from './common/SaveButton'
import TagList from '../../common/TagList'
import agent from '../../../agent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  constructor(props){
    super(props)

    this.submitForm = (year, keyList, businessSegments, grossProfitMargin, plans, actionsDone) => ev => {
      ev.preventDefault()
      businessSegments = businessSegments.filter(segment => segment.business !== '')
      plans = plans.filter(unit => unit.plan !== '')
      actionsDone = actionsDone.filter(actionDone => actionDone !== '')

      const record = { year, keyList, businessSegments, grossProfitMargin, plans, actionsDone }
      const originalYear = { originalYear: this.props.originalYear }

      const payload = this.props.originalYear ?
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
    let { company, locationHash } = this.props
    if(!company || (!locationHash.match(/#\/companies\/[0-9]+/g) && !locationHash.startsWith('#/recordEditor'))){ return null }
    
    if(locationHash.match(/#\/companies\/[0-9]+/g)){
      return (
        <React.Fragment>
          {/* Left Section */}
          <span className="left-layout" onClick={this.togglePlan}>
            <img src={company.logo} height="20px" style={{ borderRadius: "50%", border: "1px solid #586069" }} alt={company.abbr} />
          </span>
  
          {/* Middle Section */}
          <div className="nav-item middle-layout company-name">
          {
            company.link ?
            <a href={company.link} target="_blank" rel="noopener noreferrer">{company.name}</a>
            : company.name
          }
            <TagList tagList={company.tagList} />
          </div>
  
          {/* Right Section */}
          <div className="nav-item right-layout">
            <UserControl />
          </div>
        </React.Fragment>
      )
    }
    
    if(locationHash.startsWith('#/recordEditor')){
      const { year, keyList, businessSegments, grossProfitMargin, plans, actionsDone } = this.props
      
      return (
        <React.Fragment>
          {/* Left Section */}
          <Link className="left-layout" to={`/companies/${company.symbol}`}>
            <FontAwesomeIcon icon={['far', 'arrow-alt-circle-left']} size="lg" />
          </Link>
    
          {/* Middle Section */}
          <div className="nav-item">
            { this.props.originalYear ? null : 'New Record' }
          </div>
    
          {/* Right Section */}
          <div className="nav-item right-layout">
            <SaveButton
              inProgress={this.props.inProgress}
              onSave={this.submitForm(year, keyList, businessSegments, grossProfitMargin, plans, actionsDone)} />
          </div>
        </React.Fragment>
      )
    }    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsView)

import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import agent from '../agent'

import {
  RECORDS_PAGE_UNLOADED,
  RECORDS_PAGE_LOADED
} from '../constants'

const mapStateToProps = state => ({
  company: state.recordList.company,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({
    type: RECORDS_PAGE_LOADED,
    payload
  }),
  onUnload: () => dispatch({
    type: RECORDS_PAGE_UNLOADED
  })
})

class Records extends React.Component {
  componentWillMount(){
    if(this.props.company){
      this.props.onLoad(agent.Records.all(this.props.company.symbol))
    }
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    if(!this.props.currentUser){ return <Redirect to='/' /> }

    if(!this.props.company){ return <Redirect to='/companies' /> }

    return (
      <div>This is RecordList</div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Records)
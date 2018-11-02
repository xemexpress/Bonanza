import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import RecordList from './RecordList'
import agent from '../../agent'

import {
  RECORDS_PAGE_LOADED
} from '../../constants'

const mapStateToProps = state => ({
  company: state.recordList.company,
  records: state.recordList.records,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({
    type: RECORDS_PAGE_LOADED,
    payload
  })
})

class Records extends React.Component {
  componentWillMount(){
    this.props.onLoad(Promise.all([
      agent.Companies.get(this.props.match.params.symbol),
      agent.Records.all(this.props.match.params.symbol)
    ]))
  }

  render(){
    return (
      <div className="row">
        <div className="offset-lg-1 col-lg-10 col-md-12 col-xs-12 col-sm-12">
        {
          !this.props.currentUser ? <div>&emsp;&nbsp;&nbsp;<Link to='/'>Back</Link></div>
          : !this.props.company ? <div>&emsp;&nbsp;&nbsp;Loading...</div>
          : <RecordList records={this.props.records} />
        }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Records)

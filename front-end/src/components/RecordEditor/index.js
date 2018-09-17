import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import ListErrors from '../common/ListErrors'
import TimeGpmBrief from './TimeGpmBrief'
import Deeds from './Deeds'
import BusinessSegs from './BusinessSegs'
import Keys from './Keys'
import './RecordEditor.css'

import {
  RECORD_EDITOR_PAGE_UNLOADED
} from '../../constants'

const mapStateToProps = state => ({
  errors: state.recordEditor.errors,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onUnload: () => dispatch({
    type: RECORD_EDITOR_PAGE_UNLOADED
  })
})

class RecordEditor extends React.Component {
  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    if(!this.props.currentUser){ return <Redirect to='/' /> }

    return (
      <div className="row">
        <div className="offset-lg-2 col-lg-8 offset-md-2 col-md-8 offset-sm-1 col-sm-10 col-xs-12">
          <ListErrors errors={this.props.errors} />

          <div className="interaction-card form-control">
            <form className="record-editor">
              <fieldset>
                <TimeGpmBrief />

                <Deeds />

                <BusinessSegs />

                <Keys />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordEditor)

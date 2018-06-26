import React from 'react'
import { connect } from 'react-redux'

import TagList from '../TagList'
import {
  UPDATE_FIELD_RECORD_EDITOR,
  REMOVE_KEY
} from '../../constants'

const mapStateToProps = state => ({
  keyList: state.recordEditor.keyList
})

const mapDispatchToProps = dispatch => ({
  onUpdateKeyList: value => dispatch({
    type: UPDATE_FIELD_RECORD_EDITOR,
    key: 'keyList',
    value
  }),
  onRemoveKey: index => dispatch({
    type: REMOVE_KEY,
    index
  })
})

class Keys extends React.Component {
  constructor(){
    super()
    this.state = { keyInput: '' }

    this.changeKeyInput = ev => this.setState({ keyInput: ev.target.value })

    this.watchForEnter = ev => {
      ev.preventDefault()

      if(ev.keyCode === 13 && ev.target.value !== ''){
        this.props.onUpdateKeyList(this.props.keyList.concat([this.state.keyInput]))

        this.setState({ keyInput: '' })
      }
    }

    this.removeKey = index => ev => {
      ev.preventDefault()
      this.props.onRemoveKey(index)
    }
  }

  render(){
    return (
      <div className="record-section keys">
        <div className="row">
          <div className="col-xs-1">
            <i className="fas fa-tags"></i>
          </div>
          <div className="col-xs-11">
            <TagList tagList={this.props.keyList} removeTag={this.removeKey} />
          </div>
        </div>
        <input type='text' value={this.state.keyInput} onChange={this.changeKeyInput} onKeyUp={this.watchForEnter} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keys)

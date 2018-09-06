import React from 'react'
import { connect } from 'react-redux'

import {
  UPDATE_FIELD_RECORD_EDITOR
} from '../../../constants'

const mapStateToProps = state => ({
  actionsDone: state.recordEditor.actionsDone
})

const mapDispatchToProps = dispatch => ({
  onUpdateActionsDone: value => dispatch({
    type: UPDATE_FIELD_RECORD_EDITOR,
    key: 'actionsDone',
    value
  })
})

class ActionsDone extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      newActionDone: ''
    }

    this.changeActionsDoneAt = index => ev => {
      ev.preventDefault()

      let actionsDoneToUpdate = this.props.actionsDone.slice()
      if(ev.keyCode !== 13){
        actionsDoneToUpdate[index] = ev.target.value
      }else if(ev.target.value !== ''){
        actionsDoneToUpdate.splice(index,1)
      }

      this.props.onUpdateActionsDone(actionsDoneToUpdate)
    }

    this.changeNewActionDone = ev => this.setState({ newActionDone: ev.target.value })

    this.loadInStore = () => {
      this.props.onUpdateActionsDone(this.props.actionsDone.concat([this.state.newActionDone]))
      this.setState({ newActionDone: '' })
    }

    this.watchForEnter = ev => {
      ev.preventDefault()
      
      if(ev.keyCode === 13){ this.loadInStore() }
    }
  }

  componentWillUnmount(){
    if(this.state.newActionDone !== ''){
      this.loadInStore()
    }
  }  

  render(){
    return (
      <React.Fragment>
      {
        this.props.actionsDone.map((actionDone, i) => {
          return <input type="text" value={actionDone} onChange={this.changeActionsDoneAt(i)} key={i} />
        })
      }
        <input type="text" value={this.state.newActionDone} onChange={this.changeNewActionDone} onKeyUp={this.watchForEnter} />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionsDone)

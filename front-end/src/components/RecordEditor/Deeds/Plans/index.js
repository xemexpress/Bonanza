import React from 'react'
import { connect } from 'react-redux'

import Plan from './Plan'

import {
  UPDATE_FIELD_RECORD_EDITOR
} from '../../../../constants'

const mapStateToProps = state => ({
  plans: state.recordEditor.plans
})

const mapDispatchToProps = dispatch => ({
  onUpdatePlans: value => dispatch({
    type: UPDATE_FIELD_RECORD_EDITOR,
    key: 'plans',
    value
  })
})

class Plans extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      newPlan: '',
      newExecuted: '',
      canEditBadage: false
    }

    this.changePlansAt = (index, property) => ev => {
      ev.preventDefault()

      let plansToUpdate = this.props.plans.slice()

      if(property === 'plan'){
        if(ev.keyCode !== 13){
          plansToUpdate[index][property] = ev.target.value
        }else if(ev.target.value !== ''){
          plansToUpdate.splice(index, 1)
        }
      }else if(property === 'executed'){
        plansToUpdate[index][property] = ev.target.value
      }

      this.props.onUpdatePlans(plansToUpdate)
    }

    this.changeNewPlan = ev => this.setState({ newPlan: ev.target.value })
    this.changeNewExecuted = ev => this.setState({ newExecuted: ev.target.value })

    this.switch = port => this.setState({ canEditBadage: typeof port === 'number' ? port : false })

    this.loadInStore = () => {
      if(this.state.newPlan !== ''){
        let planUnit = {
          plan: this.state.newPlan,
          executed: this.state.newExecuted
        }
        this.props.onUpdatePlans(this.props.plans.concat([planUnit]))

        this.setState({ newPlan: '', newExecuted: '' })
      }
    }

    this.watchForEnter = ev => {
      ev.preventDefault()
      
      if(ev.keyCode === 13){ this.loadInStore() }
    }
  }

  componentWillUnmount(){
    this.loadInStore()
  }

  render(){
    return (
      <React.Fragment>
      {
        this.props.plans.map((unit, i) => {
          return (
            <Plan
              isNew={false}
              unit={unit}
              index={i}
              canEditBadage={this.state.canEditBadage}
              onSwitch={this.switch}
              changeAt={this.changePlansAt}
              key={i}/>
          )
        })
      }
      <Plan
        isNew={true}
        unit={this.state}
        index={this.props.plans.length}
        canEditBadage={this.state.canEditBadage}
        onSwitch={this.switch}
        changeNewPlan={this.changeNewPlan}
        changeNewExecuted={this.changeNewExecuted}
        watchForEnter={this.watchForEnter} />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plans)

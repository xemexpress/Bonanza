import React from 'react'
import { connect } from 'react-redux'

import BusinessSeg from './BusinessSeg'
import MyTabs from '../common/MyTabs'

import {
  UPDATE_FIELD_RECORD_EDITOR
} from '../../../constants'

const mapStateToProps = state => ({
  businessSegments: state.recordEditor.businessSegments
})

const mapDispatchToProps = dispatch => ({
  onUpdateBusinessSegments: value => dispatch({
    type: UPDATE_FIELD_RECORD_EDITOR,
    key: 'businessSegments',
    value
  })
})

class BusinessSegs extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      newBusiness: '',
      newShare: '',
      newGrossProfitMargin: '',
      canEditBadages: false
    }

    this.changeBusinessSegmentsAt = (index, property) => ev => {
      ev.preventDefault()

      let businessSegmentsToUpdate = this.props.businessSegments.slice()

      if(property === 'business'){
        if(ev.keyCode !== 13){
          businessSegmentsToUpdate[index][property] = ev.target.value
        }else if(ev.target.value === ''){
          businessSegmentsToUpdate.splice(index, 1)
        }
      }else if(property === 'share' || property === 'grossProfitMargin'){
        businessSegmentsToUpdate[index][property] = Math.round(ev.target.value * 10) / 10
      }

      this.props.onUpdateBusinessSegments(businessSegmentsToUpdate)
    }
    
    this.changeNewBusiness = ev => this.setState({ newBusiness: ev.target.value })
    this.changeNewShare = ev => this.setState({ newShare: Math.round(ev.target.value * 10) / 10 })
    this.changeNewGrossProfitMargin = ev => this.setState({ newGrossProfitMargin: Math.round(ev.target.value * 10) / 10 })

    this.switch = port => this.setState({ canEditBadages: typeof port === 'number' ? port : false })

    this.loadInStore = () => {
      let segment = {
        business: this.state.newBusiness,
        share: this.state.newShare,
        grossProfitMargin: this.state.newGrossProfitMargin
      }
      this.props.onUpdateBusinessSegments(this.props.businessSegments.concat([segment]))

      this.setState({ newBusiness: '', newShare: '', newGrossProfitMargin: '' })
    }

    this.watchForEnter = ev => {
      ev.preventDefault()

      if(ev.keyCode === 13){ this.loadInStore() }
    }
  }

  render(){
    return (
      <div className="record-section business">
        <div className="row">
          <div className="col-xs-3">
            <MyTabs
              mSymbol='R'
              tabState='R'
              ySymbol={null} changeMy={null} />
          </div>
        </div>
  
        <div className="row">
        {
          this.props.businessSegments.map((segment, i) => {
            return (
              <BusinessSeg
                isNew={false}
                unit={segment}
                index={i}
                canEditBadages={this.state.canEditBadages}
                onSwitch={this.switch}
                changeAt={this.changeBusinessSegmentsAt}
                key={i} />
            )
          })
        }
          <BusinessSeg
            isNew={true}
            unit={this.state}
            index={this.props.businessSegments.length}
            canEditBadages={this.state.canEditBadages}
            onSwitch={this.switch}
            changeNewBusiness={this.changeNewBusiness}
            changeNewShare={this.changeNewShare}
            changeNewGrossProfitMargin={this.changeNewGrossProfitMargin}
            watchForEnter={this.watchForEnter} />
        </div>
      </div>
    )   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSegs)

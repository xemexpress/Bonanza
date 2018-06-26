import React from 'react'

import MyTabs from '../common/MyTabs'
import ActionsDone from './ActionsDone'
import Plans from './Plans'

class Deeds extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mY: 'E'
    }

    this.changeMy = ev => {
      ev.preventDefault()
      this.setState({ mY: ev.target.innerHTML })
    }
  }

  render(){
    return (
      <div className="record-section deeds">
        <div className="row">
          <div className="col-xs-3">
            <MyTabs
              changeMy={this.changeMy}
              mSymbol='E'
              ySymbol='P'
              tabState={this.state.mY} />
          </div>
        </div>
        <div className="deeds-detail">
          {
            this.state.mY === 'E' ? <ActionsDone />
            : this.state.mY === 'P' ? <Plans /> : null
          }
        </div>
      </div>
    )   
  }
}

export default Deeds

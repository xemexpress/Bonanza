import React from 'react'
import { connect } from 'react-redux'

import Header from './Header'
import LongList from './LongList'

const mapStateToProps = state => ({
  appName: state.appName
})

class App extends React.Component {
  render(){
    return (
      <div className="container-fluid"> 
        <Header appName={this.props.appName} />
      	<LongList />
      </div>
    )
  }
}

export default connect(mapStateToProps, () => ({}))(App)

import React from 'react'
import { connect } from 'react-redux'

import {
  LOGOUT
} from '../../../constants'

const mapDispatchToProps = dispatch => ({
  onLogOut: () => dispatch({
    type: LOGOUT
  })
})

var timeout

class LogOutButton extends React.Component {
  constructor(){
    super()
    this.state = {
      logOutConfirm: false,
      iconClassName: 'fas fa-rocket fa-lg'
    }

    this.logOut = ev => {
      if(this.state.logOutConfirm){
        this.props.onLogOut()
      }else{
        this.setState({
          logOutConfirm: true,
          iconClassName: 'fas fa-sign-out-alt fa-lg'
        })
        this.resetRocket()
      }
    }
  }

  resetRocket(){
    timeout = setTimeout(()=>{
      this.setState({
        logOutConfirm: false,
        iconClassName: 'fas fa-rocket fa-lg'
      })
    }, 2000)
  }

  componentWillUnmount(){
    clearTimeout(timeout)
  }

  render(){
    return (
      <button className="btn btn-outline-danger" onClick={this.logOut}>
        <i className={this.state.iconClassName}></i>
      </button>
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(LogOutButton)

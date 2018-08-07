import React from 'react'
import { connect } from 'react-redux'

import agent from '../../../../agent'

import {
  COMPANIES_PAGE_TAG_LOADED,
  LOGOUT,
  JUMPSTART
} from '../../../../constants'

const mapStateToProps = state => ({
  search: state.companyList.search,
  tag: state.companyList.tag
})

const mapDispatchToProps = dispatch => ({
  onSwitchTag: (companyName, tag) => dispatch({
    type: COMPANIES_PAGE_TAG_LOADED,
    payload: agent.Companies.all(0, 0, companyName, tag),
    tag
  }),
  onLogOut: () => dispatch({
    type: LOGOUT
  }),
  onJumpstart: pathname => dispatch({
    type: JUMPSTART,
    pathname
  })
})

var timeout

class JumpstartButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      jumpstartConfirm: false,
      iconClassName: 'fas fa-rocket fa-lg'
    }

    this.jumpstart = () => {
      if(this.state.jumpstartConfirm){
        if(this.props.to){
          this.props.onJumpstart(this.props.to)
        }else{
          this.props.onLogOut()
        }
      }else{
        this.setState({
          jumpstartConfirm: true,
          iconClassName: 'fas fa-sign-out-alt fa-lg'
        })

        if(this.props.switchTag){
          this.props.onSwitchTag(this.props.search, this.props.tag === this.props.switchTag ? '' : this.props.switchTag)
        }

        this.resetRocket()
      }
    }
  }

  resetRocket(){
    timeout = setTimeout(()=>{
      this.setState({
        jumpstartConfirm: false,
        iconClassName: 'fas fa-rocket fa-lg'
      })
    }, 1000)
  }

  componentWillUnmount(){
    clearTimeout(timeout)
  }

  render(){
    return (
      <button className="btn btn-outline-danger" onClick={this.jumpstart}>
        <i className={this.state.iconClassName}></i>
      </button>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JumpstartButton)

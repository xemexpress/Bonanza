import React from 'react'
import { connect } from 'react-redux'

import agent from '../../../../../agent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  COMPANIES_PAGE_TAG_LOADED,
  LOGOUT,
  JUMPSTART,
  THE_TAGS
} from '../../../../../constants'

const mapStateToProps = state => ({
  search: state.companyList.search,
  tags: state.companyList.tags
})

const mapDispatchToProps = dispatch => ({
  onSwitchTag: (companyName, tags) => dispatch({
    type: COMPANIES_PAGE_TAG_LOADED,
    payload: agent.Companies.all(0, 0, companyName, tags),
    tags
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
      iconName: 'rocket'
    }

    this.jumpstart = () => {
      if(this.state.jumpstartConfirm){
        let target = this.props.onHash === '#/' || this.props.onHash === '#/companies' ? null
            : this.props.onHash.match(/#\/companies\/[0-9]+/g) ? '/companies'
            : null

        if(target){
          this.props.onJumpstart(target)
        }else{
          this.props.onLogOut()
        }
      }else{
        this.setState({
          jumpstartConfirm: true,
          iconName: 'sign-out-alt'
        })

        if(this.props.onHash === '#/companies'){
          this.props.onSwitchTag(this.props.search, this.props.tags === THE_TAGS ? [] : THE_TAGS)
        }

        this.resetRocket()
      }
    }
  }

  resetRocket(){
    timeout = setTimeout(()=>{
      this.setState({
        jumpstartConfirm: false,
        iconName: 'rocket'
      })
    }, 1000)
  }

  componentWillUnmount(){
    clearTimeout(timeout)
  }

  render(){
    return (
      <button className="btn btn-outline-danger" onClick={this.jumpstart}>
        <FontAwesomeIcon icon={['fas', this.state.iconName]} size="lg" />
      </button>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JumpstartButton)

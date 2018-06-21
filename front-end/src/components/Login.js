import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import ListErrors from './ListErrors'
import Footer from './Footer'
import agent from '../agent'

import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  AUTH_PAGE_UNLOADED
} from '../constants'

const mapStateToProps = state => ({
  ...state.auth,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onUpdateField: (key, value) => dispatch({
    type: UPDATE_FIELD_AUTH,
    key,
    value
  }),
  onLogIn: (username, password) => dispatch({
    type: LOGIN,
    payload: agent.Auth.login(username, password)
  }),
  onUnload: () => dispatch({
    type: AUTH_PAGE_UNLOADED
  })
})

class Login extends React.Component {
  constructor(){
    super()
    
    const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value)
    this.changeUsername = updateFieldEvent('username')
    this.changePassword = updateFieldEvent('password')
    this.submitForm = (username, password) => ev => {
      ev.preventDefault()
      this.props.onLogIn(username, password)
    }
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    if(this.props.currentUser){ return <Redirect to='/companies' /> }
    
    const { username, password } = this.props
    
    return (
      <div className="auth-page row">
        <div className="offset-lg-4 col-lg-4 offset-md-3 col-md-6 offset-sm-2 col-sm-8 offset-xs-1 col-xs-10">
          <ListErrors errors={this.props.errors} />
          
          <div className="interaction-card form-control">
            <form onSubmit={this.submitForm(username, password)}>
              <fieldset>
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={this.changeUsername} />

                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={this.changePassword} />

                <button
                  type="submit"
                  disabled={this.props.inProgress}>
                  Sign In
                </button>
              </fieldset>
            </form>
          </div>
          
          <Footer />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

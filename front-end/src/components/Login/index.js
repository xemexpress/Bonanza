import React from 'react'
import { connect } from 'react-redux'

import ListErrors from '../ListErrors'
import agent from '../../agent'
import './Login.css'

import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  AUTH_PAGE_LOADED,
  UNIMEMO_LOGO
} from '../../constants'

const mapStateToProps = state => ({
  ...state.auth
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
    type: AUTH_PAGE_LOADED
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
    const { username, password } = this.props
    return (
      <div className="auth-page row">
        <div className="offset-lg-4 col-lg-4 offset-md-3 col-md-6 offset-sm-2 col-sm-8 offset-xs-1 col-xs-10">
          <ListErrors errors={this.props.errors} />
          
          <div className="login interaction-card">
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
          <div className="footer">
            <div>Powered by UniMemo</div>
            <a href="https://github.com/xemexpress/UniMemo" target="_blank" rel="noopener noreferrer">
              <img className="unimemo-logo" src={UNIMEMO_LOGO} height="14px" alt="UniMemo" />
            </a>
            <div className="unimemo-manifesto">
              我們認爲，每個人都能夠發展出他們擅長並熱愛的事業。<br/>
              人唯有在這狀態，才能自覺、勇敢地克服問題，成就卓越。<br/>
              社會亦唯有隨着這狀態的普及，才能免於政治上的龐大花費和無扭轉意義的拖延。<br/>
              因此，爲了人類整體福祉，社會應創造條件讓更多人自我覺醒。<br/>
              <br/>
              「自我覺醒」需要時間和資源。而當前社會資本當道，人才和科技亦漸趨普及。<br/>
              作爲社會一員，我們必須把握優勢——<br/>
              集衆人之智，建立「時、地、人資訊流通」的環境;<br/>
              合一己之順便，創造額外可利用的時間和資源。<br/>
              <br/>
              爲社會的美好將來，我們願意付出我們的順便、能力和資源，貫徹使命，實現目標。
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

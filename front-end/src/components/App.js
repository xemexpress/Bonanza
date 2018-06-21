import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './Header'
import MainView from './MainView'
import Home from './Home'
import Login from './Login'
import ArticleEditor from './ArticleEditor';
import CompanyList from './CompanyList';
import CompanyEditor from './CompanyEditor';
import RecordList from './RecordList';
import RecordEditor from './RecordEditor';
import agent from '../agent';

import {
  APP_LOADED,
  REDIRECT
} from '../constants'

const mapStateToProps = state => ({
  ...state.common,
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({
    type: APP_LOADED,
    payload,
    token
  }),
  onRedirect: () => dispatch({
    type: REDIRECT
  })
})

class App extends React.Component {
  componentWillMount(){
    const token = window.localStorage.getItem('jwt')
    if(token){
      agent.setToken(token)
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.redirectTo){
      this.context.router.history.replace(nextProps.redirectTo)
      this.props.onRedirect()
    }
  }

  render(){
    return (
      <div className="container-fluid"> 
        <Header
          locationHash={window.location.hash}
          currentUser={this.props.currentUser} />
        <MainView>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/articleEditor' component={ArticleEditor} />
            <Route exact path='/companies' component={CompanyList} />
            <Route exact path='/companyEditor' component={CompanyEditor} />
            <Route exact path='/companies/:symbol' component={RecordList} />
            <Route exact path='/recordEditor' component={RecordEditor} />
            <Redirect to='/' />
          </Switch>
        </MainView>
      </div>
    )
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

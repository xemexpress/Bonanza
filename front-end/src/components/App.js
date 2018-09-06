import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import GitLink from './GitLink'
import Header from './Header'
import MainView from './MainView'
import Home from './Home'
import Login from './Login'
import ArticleEditor from './ArticleEditor'
import Companies from './Companies'
import CompanyEditor from './CompanyEditor'
import Records from './Records'
import RecordEditor from './RecordEditor'
import agent from '../agent'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faMinus,
  faPencilAlt,
  faAngleDown,
  faAngleRight,
  faRocket,
  faSignOutAlt,
  faSearch,
  faTimesCircle,
  faChartPie,
  faTags,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import {
  faTrashAlt,
  faArrowAltCircleLeft,
  faEdit,
  faPlusSquare,
  faHandshake
} from '@fortawesome/free-regular-svg-icons'
import {
  faFulcrum
} from '@fortawesome/free-brands-svg-icons'

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

    library.add(
      faMinus,
      faPencilAlt,
      faAngleDown,
      faAngleRight,
      faRocket,
      faSignOutAlt,
      faSearch,
      faTimesCircle,
      faChartPie,
      faTags,
      faTimes,
      faTrashAlt,
      faArrowAltCircleLeft,
      faEdit,
      faPlusSquare,
      faHandshake,
      faFulcrum
    )
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
      {
        this.props.currentUser ?
        null:
        <GitLink />
      }
        <Header locationHash={window.location.hash} currentUser={this.props.currentUser} appName={this.props.appName} />
        <MainView>
          <Switch>
            {/* Testing Purpose */}
            {/* <Route path='/' component={Records} /> */}

            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route path='/articleEditor/:id?' component={ArticleEditor} />
            <Route exact path='/companies' component={Companies} />
            <Route path='/companyEditor/:symbol?' component={CompanyEditor} />
            <Route exact path='/companies/:symbol' component={Records} />
            <Route path='/recordEditor/:symbol?/:year?' component={RecordEditor} />
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

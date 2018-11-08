import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import UsernameSpan from './common/UsernameSpan'
import SaveButton from './common/SaveButton'
import Overlay from './common/Overlay'
import UserControl from './common/UserControl'
import agent from '../../../agent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  SUBMIT_ARTICLE
} from '../../../constants'

const mapStateToProps = state => ({
  ...state.articleEditor,   // For saving an article
  canEdit: state.articleList.canEdit
})

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch({
    type: SUBMIT_ARTICLE,
    payload
  })
})

class ArticlesView extends React.Component {
  constructor(props){
    super(props)
    
    this.submitForm = (title, body, image) => ev => {
      ev.preventDefault()

      const article = { title, body, image }
      const id = { id: this.props.id }
      let payload = this.props.id ?
                    agent.Articles.update(Object.assign(article, id))
                    : agent.Articles.create(article)
      this.props.onSubmit(payload)
    }
  }

  render(){
    if(this.props.selectedCompany || ((this.props.locationHash !== '#/' && !this.props.locationHash.startsWith('#/articleEditor')) || !this.props.currentUser)){ return null }

    if(this.props.locationHash === '#/'){
      return (
        <React.Fragment>
          {/* Left Section */}
          <Link className="left-layout" to='/companies'>
            <FontAwesomeIcon icon={['far', 'arrow-alt-circle-left']} size="lg" />
          </Link>
    
          {/* Middle Section */}
          <div className="nav-item">
          { null }
          </div>
    
          {/* Right Section */}
          <div className="nav-item right-layout username">
            <UsernameSpan username={this.props.currentUser.username} />
            <Overlay canEdit={this.props.canEdit}>
              <UserControl />
            </Overlay>
          </div>
        </React.Fragment>
      )
    }

    if(this.props.locationHash.startsWith('#/articleEditor')){
      let { title, body, image } = this.props

      return (
        <React.Fragment>
          {/* Left Section */}
          <Link className="left-layout" to='/'>
            <FontAwesomeIcon icon={['far', 'arrow-alt-circle-left']} size="lg" />
          </Link>
    
          {/* Middle Section */}
          <div className="nav-item">
            { this.props.id ? null : 'New Article' }
          </div>
    
          {/* Right Section */}
          <div className="nav-item right-layout">
            <SaveButton
              inProgress={this.props.inProgress}
              onSave={this.submitForm(title, body, image)} />
          </div>
        </React.Fragment>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesView)

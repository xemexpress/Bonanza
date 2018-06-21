import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import UsernameSpan from './common/UsernameSpan'
import SaveButton from './common/SaveButton';
import UserControll from './common/UserControll'
import agent from '../../../agent'

import {
  SUBMIT_ARTICLE
} from '../../../constants';

const mapStateToProps = state => ({
  ...state.articleEditor,   // For saving an article
  allowEdit: state.articleList.canEdit
})

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch({
    type: SUBMIT_ARTICLE,
    payload
  })
})

class ArticlesView extends React.Component {
  constructor(){
    super()
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
    if(this.props.selectedCompany || (this.props.locationHash !== '#/' && this.props.locationHash !== '#/articleEditor')){ return null }

    let { title, body, image } = this.props

    return (
      <React.Fragment>
        {/* Left Section */}
        <Link className="left-layout" to={this.props.locationHash === '#/articleEditor' ? '/' : "/companies"}>
          <i className="far fa-arrow-alt-circle-left fa-lg"></i>
        </Link>
  
        {/* Middle Section */}
        <div className="nav-item middle-layout header-search">
        { null }
        </div>
  
        {/* Right Section */}
        {
          this.props.locationHash === '#/articleEditor' ?
          <div className="nav-item right-layout">
            <SaveButton onSave={this.submitForm(title, body, image)} />
          </div>
          : this.props.locationHash === '#/' ?
          <div className="nav-item right-layout username">
            <UsernameSpan username={this.props.currentUser.username} />
            <div className="overlay" style={this.props.allowEdit ? { opacity: '1', zIndex: '1' } : null}>
              <UserControll
                addNew='articleEditor' />
            </div>
          </div>
          : null
        }
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesView)

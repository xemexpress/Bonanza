import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import ListErrors from './ListErrors'

import {
  UPDATE_FIELD_ARTICLE_EDITOR,
  ARTICLE_EDITOR_PAGE_UNLOADED
} from '../constants'

const mapStateToProps = state => ({
  ...state.articleEditor,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onUpdateField: (key, value) => dispatch({
    type: UPDATE_FIELD_ARTICLE_EDITOR,
    key,
    value
  }),
  onUnload: () => dispatch({
    type: ARTICLE_EDITOR_PAGE_UNLOADED
  })
})

class ArticleEditor extends React.Component {
  constructor(){
    super()

    const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value)
    this.changeTitle = updateFieldEvent('title')
    this.changeBody = updateFieldEvent('body')
    this.changeImage = updateFieldEvent('image')
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    if(!this.props.currentUser){ return <Redirect to='/' /> }
    
    const { title, body, image } = this.props

    return (
      <div className="row">
        <div className="offset-lg-2 col-lg-8 offset-md-1 col-md-10 col-sm-12 col-xs-12">
          <ListErrors errors={this.props.errors} />

          <div className="interaction-card form-control">
            <form>
              <fieldset>
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={this.changeTitle} />

                <label>Body</label>
                <textarea
                  rows='22'
                  value={body}
                  onChange={this.changeBody} />

                <label>Image (if any)</label>
                <input
                  type="text"
                  value={image}
                  onChange={this.changeImage} />
                {
                  image ?
                  <span>
                    <label>Preview:</label>
                    <img className="center-image" src={image} alt="preview" />
                  </span>
                  : null
                }
              </fieldset>
            </form>
          </div>
          <br />
          <hr />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditor)

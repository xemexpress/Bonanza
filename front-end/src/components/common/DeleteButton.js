import React from 'react'
import { connect } from 'react-redux'

import agent from '../../agent'

import {
  DELETE_ARTICLE
} from '../../constants'

const mapDispatchToProps = dispatch => ({
  onDeleteArticle: articleId => dispatch({
    type: DELETE_ARTICLE,
    payload: agent.Articles.delete(articleId),
    articleId
  })
})

class DeleteButton extends React.Component {
  constructor(){
    super()

    this.deleteArticle = articleId => ev => {
      ev.preventDefault()

      this.props.onDeleteArticle(articleId)
    }
  }

  render(){
    return (
      <button className='btn btn-outline-danger' onClick={this.deleteArticle(this.props.articleId)}>
        <i className="far fa-trash-alt"></i>
      </button>
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(DeleteButton)

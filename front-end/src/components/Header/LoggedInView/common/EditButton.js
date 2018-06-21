import React from 'react'
import { connect } from 'react-redux'

import {
  ALLOW_EDIT_ARTICLE
} from '../../../../constants'

const mapStateToProps = state => ({
  canEdit: state.articleList.canEdit
})

const mapDispatchToProps = dispatch => ({
  onAllowEditArticles: () => dispatch({
    type: ALLOW_EDIT_ARTICLE
  })
})

class EditButton extends React.Component {
  constructor(){
    super()

    this.edit = () => {
      if(this.props.onHash === '#/'){
        this.props.onAllowEditArticles()
      }
    }
  }

  render(){
    let className = 'btn btn-outline-info'
    className += this.props.canEdit ? ' selected' : ''
    return (
      <button className={className} onClick={this.edit}>
        <i className="far fa-edit fa-lg"></i>
      </button>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditButton)

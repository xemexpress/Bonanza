import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  ARTICLE_EDITOR_PAGE_LOADED
} from '../../constants'

const mapDispatchToProps = dispatch => ({
  onLoadEditor: article => dispatch({
    type: ARTICLE_EDITOR_PAGE_LOADED,
    article
  })
})

class FixButton extends React.Component {
  constructor(){
    super()
    
    this.fix = ev => {
      ev.preventDefault()

      this.props.onLoadEditor(this.props.article)
    }
  }

  render(){
    return (
      <button className='btn btn-outline-info' onClick={this.fix}>
        <Link to="/articleEditor">
          <i className="fas fa-pencil-alt"></i>
        </Link>
      </button>
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(FixButton)

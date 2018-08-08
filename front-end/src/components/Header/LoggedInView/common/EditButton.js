import React from 'react'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  ALLOW_EDIT_ARTICLES,
  ALLOW_EDIT_COMPANIES,
  ALLOW_EDIT_RECORDS
} from '../../../../constants'

const mapStateToProps = state => ({
  canEdit: state.articleList.canEdit || state.companyList.canEdit || state.recordList.canEdit
})

const mapDispatchToProps = dispatch => ({
  onAllowEditArticles: () => dispatch({
    type: ALLOW_EDIT_ARTICLES
  }),
  onAllowEditCompanies: () => dispatch({
    type: ALLOW_EDIT_COMPANIES
  }),
  onAllowEditRecords: () => dispatch({
    type: ALLOW_EDIT_RECORDS
  })
})

class EditButton extends React.Component {
  constructor(){
    super()

    this.edit = () => {
      var toggle = this.props.onHash === '#/' ?
                  this.props.onAllowEditArticles
                  : this.props.onHash === '#/companies' ?
                  this.props.onAllowEditCompanies
                  : this.props.onHash.match(/#\/companies\/[0-9]+/g) ?
                  this.props.onAllowEditRecords
                  : null
      toggle()
    }
  }

  render(){
    let className = 'btn btn-outline-info'
    className += this.props.canEdit ? ' selected' : ''
    return (
      <button className={className} onClick={this.edit}>
        <FontAwesomeIcon icon={['far', 'edit']} size="lg" />
      </button>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditButton)

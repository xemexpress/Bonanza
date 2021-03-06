import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  ARTICLE_EDITOR_PAGE_LOADED,
  COMPANY_EDITOR_PAGE_LOADED,
  RECORD_EDITOR_PAGE_LOADED
} from '../../constants'

const mapDispatchToProps = dispatch => ({
  onLoadArticleEditor: article => dispatch({
    type: ARTICLE_EDITOR_PAGE_LOADED,
    article
  }),
  onLoadCompanyEditor: company => dispatch({
    type: COMPANY_EDITOR_PAGE_LOADED,
    company
  }),
  onLoadRecordEditor: record => dispatch({
    type: RECORD_EDITOR_PAGE_LOADED,
    record
  })
})

const FixButton = props => {
  let { company, article, record } = props

  let onLoadEditor, onLoad, editor
  if(window.location.hash === '#/companies'){
    onLoadEditor = () => props.onLoadCompanyEditor(company)
    editor = `/companyEditor/${company.symbol}`
  }else if(window.location.hash === '#/'){
    onLoadEditor = () => props.onLoadArticleEditor(article)
    editor = `/articleEditor/${article.id}`
  }else if(window.location.hash.match(/#\/companies\/[0-9]+/g)){
    onLoadEditor = () => props.onLoadRecordEditor(record)
    editor = `/recordEditor/${company.symbol}/${record.year}`
  }

  onLoad = ev => {
    ev.preventDefault()
    onLoadEditor()
  }

  return (
    <button className='btn btn-outline-info' onClick={onLoad}>
      <Link to={editor}>
        <FontAwesomeIcon icon='pencil-alt' />
      </Link>
    </button>
  )
}

export default connect(()=>({}), mapDispatchToProps)(FixButton)

import React from 'react'
import { connect } from 'react-redux'

import agent from '../../agent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  DELETE_ARTICLE,
  DELETE_COMPANY,
  DELETE_RECORD
} from '../../constants'

const mapDispatchToProps = dispatch => ({
  onDeleteArticle: articleId => dispatch({
    type: DELETE_ARTICLE,
    payload: agent.Articles.delete(articleId),
    articleId
  }),
  onDeleteCompany: companySymbol => dispatch({
    type: DELETE_COMPANY,
    payload: agent.Companies.delete(companySymbol),
    companySymbol
  }),
  onDeleteRecord: (companySymbol, recordYear) => dispatch({
    type: DELETE_RECORD,
    payload: agent.Records.delete(companySymbol, recordYear),
    recordYear
  })
})

const DeleteButton = props => {
  let onLoadDelete, onLoad

  if(window.location.hash === '#/companies'){
    onLoadDelete = () => props.onDeleteCompany(props.companySymbol)
  }else if(window.location.hash === '#/'){
    onLoadDelete = () => props.onDeleteArticle(props.articleId)
  }else if(window.location.hash.match(/#\/companies\/[0-9]+/g)){
    onLoadDelete = () => props.onDeleteRecord(props.companySymbol, props.recordYear)
  }

  onLoad = ev => {
    ev.preventDefault()
    onLoadDelete()
  }

  return (
    <button className='btn btn-outline-danger' onClick={onLoad}>
      <FontAwesomeIcon icon={['far', 'trash-alt']} />
    </button>
  )
}

export default connect(()=>({}), mapDispatchToProps)(DeleteButton)

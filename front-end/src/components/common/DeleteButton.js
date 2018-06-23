import React from 'react'
import { connect } from 'react-redux'

import agent from '../../agent'

import {
  DELETE_ARTICLE,
  DELETE_COMPANY
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
  })
})

const DeleteButton = props => {
  let onLoadDelete, onLoad

  if(window.location.hash === '#/companies'){
    onLoadDelete = () => props.onDeleteCompany(props.companySymbol)
  }else if(window.location.hash === '#/'){
    onLoadDelete = () => props.onDeleteArticle(props.articleId)
  }

  onLoad = ev => {
    ev.preventDefault()
    onLoadDelete()
  }

  return (
    <button className='btn btn-outline-danger' onClick={onLoad}>
      <i className="far fa-trash-alt"></i>
    </button>
  )
}

export default connect(()=>({}), mapDispatchToProps)(DeleteButton)

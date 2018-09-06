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

var timeout

class DeleteButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deletionReady: false
    }

    this.onLoadDelete = window.location.hash === '#/companies' ? () => this.props.onDeleteCompany(this.props.companySymbol)
                      : window.location.hash === '#/' ? () => this.props.onDeleteArticle(this.props.articleId)
                      : window.location.hash.match(/#\/companies\/[0-9]+/g) ? () => this.props.onDeleteRecord(this.props.companySymbol, this.props.recordYear)
                      : null

    this.onLoad = ev => {
      ev.preventDefault()
      if(this.state.deletionReady){
        this.onLoadDelete()
      }else{
        this.setState({ deletionReady: true })
        this.resetRocket()
      }
    }
  }

  resetRocket(){
    timeout = setTimeout(()=>{
      this.setState({ deletionReady: false })
    }, 500)
  }

  componentWillUnmount(){
    clearTimeout(timeout)
  }

  render(){
    return (
      <button className='btn btn-outline-danger' onClick={this.onLoad}>
        <FontAwesomeIcon icon={this.state.deletionReady ? 'minus' : ['far', 'trash-alt']} />
      </button>
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(DeleteButton)

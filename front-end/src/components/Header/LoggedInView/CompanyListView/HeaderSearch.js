import React from 'react'
import { connect } from 'react-redux'

import agent from '../../../../agent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  COMPANIES_PAGE_SEARCH_LOADED
} from '../../../../constants'

const mapStateToProps = state => ({
  tag: state.companyList.tag
})

const mapDispatchToProps = dispatch => ({
  onLoadSearch: (companyName, tag) => dispatch({
    type: COMPANIES_PAGE_SEARCH_LOADED,
    payload: agent.Companies.all(0, 0, companyName, tag),
    companyName
  })
})

class HeaderSearch extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      search: ''
    }

    this.search = ev => this.setState({ search: ev.target.value })

    this.watchForEnter = ev => {
      ev.preventDefault()
      if(ev.keyCode === 13){
        this.props.onLoadSearch(this.state.search, this.props.tag)
      }
    }

    this.clearSearch = ev => {
      ev.preventDefault()
      this.setState({ search: '' })
      this.props.onLoadSearch('')
    }
  }

  render(){
    return (
      <span>
        <FontAwesomeIcon icon='search' />
        <input
          className="search-company"
          type="text"
          placeholder="Search"
          value={this.state.search}
          onChange={this.search}
          onKeyUp={this.watchForEnter} />
        {
          this.state.search !== '' ?
          <FontAwesomeIcon
            icon='times-circle'
            onClick={this.clearSearch} />
          : null
        }
      </span>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch)

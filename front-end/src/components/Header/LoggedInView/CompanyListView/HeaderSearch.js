import React from 'react'
import { connect } from 'react-redux'

import agent from '../../../../agent'

import {
  COMPANIES_PAGE_SEARCH_LOADED
} from '../../../../constants'

const mapDispatchToProps = dispatch => ({
  onLoadSearch: companyName => dispatch({
    type: COMPANIES_PAGE_SEARCH_LOADED,
    payload: agent.Companies.all(0, 0, companyName),
    companyName
  })
})

class HeaderSearch extends React.Component {
  constructor(){
    super()
    this.state = {
      search: ''
    }

    this.search = ev => this.setState({ search: ev.target.value })

    this.watchForEnter = ev => {
      ev.preventDefault()
      if(ev.keyCode === 13){
        this.props.onLoadSearch(this.state.search)
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
      <form>
        <i className="fas fa-search"></i>
        <input
          className="search-company"
          type="text"
          placeholder="Search"
          value={this.state.search}
          onChange={this.search}
          onKeyUp={this.watchForEnter} />
        {
          this.state.search !== '' ?
          <i className="fas fa-times-circle"
              onClick={this.clearSearch}></i>
          : null
        }
      </form>
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(HeaderSearch)

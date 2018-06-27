import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux'

import Company from './Company'
import agent from '../agent'

import {
  COMPANIES_PAGE_LOADED,
  COMPANIES_PER_PAGE
} from '../constants'

const mapDispatchToProps = dispatch => ({
  onLoadMoreCompanies: (companiesDeleted, page, companyName) => dispatch({
    type: COMPANIES_PAGE_LOADED,
    payload: agent.Companies.all(companiesDeleted, page, companyName)
  })
})

var timeout

class CompanyList extends React.Component {
  constructor(){
    super()
    this.state = {
      page: 0,
      hasMore: true
    }

    this.fetchMoreCompanies = () => {
      let companiesRemained = this.props.companiesCount - this.props.companies.length
      if(companiesRemained === 0){
        this.setState({ hasMore: false })
      }
      
      timeout = setTimeout(() => {
        this.setState({ page: this.state.page + 1 })
        this.props.onLoadMoreCompanies(this.props.companiesDeleted, this.state.page, this.props.search)

        if(companiesRemained <= COMPANIES_PER_PAGE){
          this.setState({ hasMore: false })
        }
      }, 700);
    }
  }

  componentWillUpdate(nextProps){
    if(nextProps.search !== this.props.search){
      this.setState({ hasMore: true, page: 0 })
    }
  }

  componentWillUnmount(){
    clearTimeout(timeout)
  }

  render(){
    if(!this.props.companies){
      return (
        <h4 className="loader">
          <i className="fab fa-earlybirds"></i><br/>
          Loading...
        </h4>
      )
    }

    if(this.props.companies.length === 0){
      return <div>No companies are here...yet.</div>
    }

    let length = this.props.companies.length
    let pack = this.props.companies.concat(length % 3 === 2 ? [{}] : [])

    return (
      <InfiniteScroll style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}
        dataLength={length}
        hasMore={this.state.hasMore}
        next={this.fetchMoreCompanies}
        loader={
          <h4 className="loader">
            <i className="fas fa-kiwi-bird"></i><br/>
            Loading...
          </h4>
        }
        endMessage={
          <h4 className="end-message">
            <i className="fas fa-kiwi-bird"></i>
          </h4>
        }>
      {
        pack.map((company, i) => {
          if(i === length){
            return <Company company={company} key={i} isSetDummy={length % 3 === 2} />
          }
          return <Company company={company} key={i} />
        })
      }
      </InfiniteScroll>
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(CompanyList)

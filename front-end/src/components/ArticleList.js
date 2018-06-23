import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux'

import Article from './Article'
import agent from '../agent'

import {
  HOME_PAGE_LOADED,
  ARTICLES_PER_PAGE
} from '../constants';

const mapDispatchToProps = dispatch => ({
  onLoadMoreArticles: (articlesDeleted, page) => dispatch({
    type: HOME_PAGE_LOADED,
    payload: agent.Articles.all(articlesDeleted, page)
  })
})

var timeout

class ArticleList extends React.Component {
  constructor(){
    super()
    this.state = {
      page: 0,
      hasMore: true
    }

    this.fetchMoreArticles = () => {
      let articlesRemained = this.props.articlesCount - this.props.articles.length
      if(articlesRemained === 0){
        this.setState({ hasMore: false })
      }
      
      timeout = setTimeout(() => {
        this.setState({ page: this.state.page + 1 })
        this.props.onLoadMoreArticles(this.props.articlesDeleted, this.state.page)

        if(articlesRemained <= ARTICLES_PER_PAGE){
          this.setState({ hasMore: false })
        }
      }, 700);
    }
  }
  
  componentWillUnmount(){
    clearTimeout(timeout)
  }

  render(){
    if(!this.props.articles){
      return (
        <h4 className="loader">
          <i className="fab fa-earlybirds"></i><br/>
          Loading...
        </h4>
      )
    }
  
    if(this.props.articles.length === 0){
      return <div>No articles are here...yet.</div>
    }

    return (
      <InfiniteScroll
        dataLength={this.props.articles.length}
        hasMore={this.state.hasMore}
        next={this.fetchMoreArticles}
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
          this.props.articles.map(article => <Article article={article} key={article.id} />)
        }
      </InfiniteScroll>
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(ArticleList)

import React from 'react'
import { connect } from 'react-redux'

import ArticleList from './ArticleList'
import agent from '../agent'

import {
  HOME_PAGE_LOADED
} from '../constants'

const mapStateToProps = state => ({
  articles: state.articleList.articles,
  articlesCount: state.articleList.articlesCount
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: HOME_PAGE_LOADED, payload })
})

class Home extends React.Component {
  componentWillMount(){
    this.props.onLoad(agent.Articles.all())
  }
  
  render(){
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <ArticleList
            articles={this.props.articles}
            articlesCount={this.props.articlesCount} />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

import React from 'react'
import { connect } from 'react-redux'

import ArticleList from './ArticleList'
import agent from '../agent'

import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from '../constants'

const mapStateToProps = state => ({
  articles: state.articleList.articles,
  articlesCount: state.articleList.articlesCount,
  articlesDeleted: state.articleList.articlesDeleted
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>dispatch({
    type: HOME_PAGE_LOADED,
    payload
  }),
  onUnload: () => dispatch({
    type: HOME_PAGE_UNLOADED
  })
})

class Home extends React.Component {
  componentWillMount(){
    this.props.onLoad(agent.Articles.all())
  }
  
  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    return (
      <div className="row">
        <div className="offset-lg-1 col-lg-10 col-xs-12 col-sm-12 col-md-12">
          <ArticleList
            articles={this.props.articles}
            articlesCount={this.props.articlesCount}
            articlesDeleted={this.props.articlesDeleted} />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

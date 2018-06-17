import React from 'react'
import marked from 'marked'
// Testing Purpose
// const ArticleList = props => {
//   return <div>No articles are here...yet.</div>
// }

import InfiniteScroll from 'react-infinite-scroll-component'


const style = {
  height: "100%",
  border: "1px solid green",
  margin: 6,
  padding: 8
};

const ArticleList = props => {
  if(!props.articles){
    return <div>Loading...</div>
  }

  if(props.articles.length === 0){
    return <div>No articles are here...yet.</div>
  }

  return (
    <InfiniteScroll
      dataLength={props.articlesCount}
      hasMore={false}
      // As Pagination
      // next={this.fetchMoreArticles}
      // loader={<h4>Loading...</h4>}
      >
      {
        props.articles.map((article, index) => {
          let markedUp = { __html: marked(article.body) }
          return (
            <div style={style} key={index}>
              <div dangerouslySetInnerHTML={markedUp}></div>
            {
              article.image ?
              <img width="100%" src={article.image} alt={`${article.body.slice(17)}...`} />
              : null
            }
            </div>
          )
        })
      }
    </InfiniteScroll>
  )
}

export default ArticleList

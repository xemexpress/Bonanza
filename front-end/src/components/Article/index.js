import React from 'react'
import marked from 'marked'
import { connect } from 'react-redux'

import FixButton from '../common/FixButton'
import DeleteButton from '../common/DeleteButton'
import './Article.css'

const mapStateToProps = state => ({
  canEdit: state.articleList.canEdit
})

const Article = props => {
  let markedUp = { __html: marked(props.article.body) }

  return (
    <div className="article">
      <h3>
        <span className="badage-attachment">
          <u>{props.article.title}</u>
          {
            props.canEdit ?
            <span className="badage-list">
              <FixButton article={props.article} />
              <DeleteButton articleId={props.article.id} />
            </span>
            : null
          }
        </span>
      </h3>

      <div dangerouslySetInnerHTML={markedUp}></div>
    {
      props.article.image ?
      <div className="row">
        <div className="offset-lg-4 col-lg-4 offset-md-3 col-md-6 offset-sm-2 col-sm-8 offset-xs-1 col-xs-10">
          <img width="100%" src={props.article.image} alt={`${props.article.body.slice(17)}...`} />
        </div>
      </div>
      : null
    }
    </div>
  )
}

export default connect(mapStateToProps, ()=>({}))(Article)

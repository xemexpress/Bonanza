import React from 'react'
import marked from 'marked'
import { connect } from 'react-redux'

import FixButton from '../../../common/FixButton'
import DeleteButton from '../../../common/DeleteButton'
import './Article.css'

const mapStateToProps = state => ({
  canEdit: state.articleList.canEdit
})

const Article = props => {
  let { article, canEdit } = props
  let markedUp = { __html: marked(article.body) }

  return (
    <div className="article">
      <h3>
        <span className="badage-attachment">
          <u>{article.title}</u>
          <span className={'functional-badage-list'.concat(canEdit ? '' : ' invisible')}>
            <FixButton article={article} />
            <DeleteButton articleId={article.id} />
          </span>
        </span>
      </h3>

      <div dangerouslySetInnerHTML={markedUp}></div>
    {
      article.image ?
      <div className="row">
        <div className="offset-lg-4 col-lg-4 offset-md-3 col-md-6 offset-sm-2 col-sm-8 offset-xs-1 col-xs-10">
          <img width="100%" src={article.image} alt={`${article.body.slice(17)}...`} />
        </div>
      </div>
      : null
    }
    </div>
  )
}

export default connect(mapStateToProps, ()=>({}))(Article)

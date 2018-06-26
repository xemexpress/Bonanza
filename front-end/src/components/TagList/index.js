import React from 'react'

import './TagList.css'

const TagList = ({ tagList, removeTag }) => {
  if(!tagList){ return null }

  return (
    <ul className="tag-list">
      {
        tagList.map((tag, i) => {
          return (
            <li className="tag" key={i}>
              <i
                className="fas fa-times fa-xs"
                onClick={removeTag(i)}></i>&nbsp;
              {tag}
            </li>
          )
        })
      }
    </ul>
  )
}

export default TagList

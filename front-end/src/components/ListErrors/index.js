import React from 'react'
import { connect } from 'react-redux'

import './ListErrors.css'

import {
  CLEAN_ERROR
} from '../../constants'

const mapDispatchToProps = dispatch => ({
  onClearErrors: () => dispatch({
    type: CLEAN_ERROR
  })
})

const ListErrors = props => {
  const errors = props.errors
  if(errors){
    return (
      <ul className="error-card">
        {
          Object.keys(errors).map((key, index) => {
            if(index === 0){
              return (
                <li key={key}>
                  {key} { errors[key] } <i className="fas fa-times fa-md" onClick={()=>props.onClearErrors()}></i>
                </li>
              )
            }
            return (
              <li key={key}>
                {key} { errors[key] }
              </li>
            )
          })
        }
      </ul>
    )
  }else{
    return null
  }  
}

export default connect(()=>({}), mapDispatchToProps)(ListErrors)

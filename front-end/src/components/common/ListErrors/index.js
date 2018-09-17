import React from 'react'
import { connect } from 'react-redux'

import './ListErrors.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  CLEAN_ERROR
} from '../../../constants'

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
                  {key} { errors[key] } <FontAwesomeIcon icon='times' onClick={()=>props.onClearErrors()} />
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

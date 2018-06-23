import React from 'react'
import { connect } from 'react-redux'

import FixButton from '../common/FixButton'
import DeleteButton from '../common/DeleteButton'

import './Company.css'

import {
  SELECT_COMPANY,
  JUMPSTART
} from '../../constants'

const mapStateToProps = state => ({
  selectedCompany: state.recordList.company,
  canEdit: state.companyList.canEdit
})

const mapDispatchToProps = dispatch => ({
  onSelect: company => dispatch({
    type: SELECT_COMPANY,
    company
  }),
  onJumpStart: pathname => dispatch({
    type: JUMPSTART,
    pathname
  })
})

const Company = props => {
  let className = 'company'
  className += props.isSetDummy ? ' dummy' : ' interaction-card'
  
  let select = company => ev => {
    ev.preventDefault()
    
    if(!props.canEdit && !props.isSetDummy){
      props.onSelect(company)
      props.onJumpStart(`/companies/${props.company.symbol}`)
    }
  }

  return (
    <div className={className} onClick={select(props.company)}>
      <span className="badage-attachment">
        <img className="center-image" src={props.company.logo} alt={props.company.abbr} />
        {
          props.canEdit && !props.isSetDummy ?
          <span className="functional-badage-list">
            <FixButton company={props.company} />
            <DeleteButton companySymbol={props.company.symbol} />
          </span>
          : null
        }
      </span>
      <div className="company-name-abbr">{props.company.abbr}</div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Company)

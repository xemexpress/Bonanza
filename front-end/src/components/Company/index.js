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
  let { company, canEdit, isSetDummy } = props

  let className = 'company'
  className += isSetDummy ? ' invisible' : ' interaction-card'
  
  let select = company => ev => {
    ev.preventDefault()
    
    if(!canEdit && !isSetDummy){
      props.onSelect(company)
      props.onJumpStart(`/companies/${company.symbol}`)
    }
  }

  return (
    <div className={className} onClick={select(company)}>
      <span className="badage-attachment">
        <img className="center-image" src={company.logo} alt={company.abbr} />
        <span className={'functional-badage-list'.concat(canEdit && !isSetDummy ? '' : ' invisible')}>
          <FixButton company={company} />
          <DeleteButton companySymbol={company.symbol} />
        </span>
      </span>
      <div className="company-name-abbr">{company.abbr}</div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Company)

import React from 'react'
import { connect } from 'react-redux'

import FixButton from '../../../common/FixButton'
import DeleteButton from '../../../common/DeleteButton'

import './Company.css'

import {
  VIEW_COMPANY_RECORDS,
  JUMPSTART,
  SELECT_COMPANY,
  API_ROOT,
  SMILEY
} from '../../../../constants'

const mapStateToProps = state => ({
  canEdit: state.companyList.canEdit,
  isSodium: state.sodium.isSodium,
  selectedCompanies: state.sodium.selectedCompanies
})

const mapDispatchToProps = dispatch => ({
  onSelectCompany: company => dispatch({
    type: SELECT_COMPANY,
    company
  }),
  onViewCompanyRecords: company => dispatch({
    type: VIEW_COMPANY_RECORDS,
    company
  }),
  onJumpStart: pathname => dispatch({
    type: JUMPSTART,
    pathname
  })
})

const Company = props => {
  let { company, isSodium, canEdit, isSetDummy } = props

  let className = 'company'.concat(isSetDummy ? ' invisible' : ' interaction-card')
  
  let select = company => ev => {
    ev.preventDefault()
    
    if(isSodium){
      props.onSelectCompany(company)
    }else if(!canEdit && !isSetDummy){
      props.onViewCompanyRecords(company)
      props.onJumpStart(`/companies/${company.symbol}`)
    }
  }

  return (
    <div className={className.concat(props.selectedCompanies.filter(selectedCompany => selectedCompany.symbol === company.symbol).length === 1 ? ' selected' : '')} onClick={select(company)}>
      <span className="badage-attachment">
        <img className="center-image" src={API_ROOT === 'http://localhost:3000/api' ? SMILEY : company.logo} alt={company.abbr} />
        <span className={'functional-badage-list'.concat(!isSodium && canEdit && !isSetDummy ? '' : ' invisible')}>
          <FixButton company={company} />
          <DeleteButton companySymbol={company.symbol} />
        </span>
      </span>
      <div className="company-name-abbr">{company.abbr}</div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Company)

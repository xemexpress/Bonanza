import React from 'react'
import { connect } from 'react-redux'

import FixButton from '../../../common/FixButton'
import DeleteButton from '../../../common/DeleteButton'
import TagList from '../../../common/TagList'
import './Record.css'

const mapStateToProps = state => ({
  company: state.recordList.company,
  showPlans: state.recordList.showPlans,
  canEdit: state.recordList.canEdit
})

const Record = props => {
  let { company, record, canEdit, showPlans } = props

  return (
    <div className="record">
      <div className="row">
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 t-col">
        {/* TIme Ref */}
          <span className="badage-attachment">
          { record.year.slice(0,4).concat(record.year.endsWith('M') ? '中' : '') }
            <span className="parameter-badage-list">
              {
                record.grossProfitMargin ?
                <span className="param-gpm">{record.grossProfitMargin.toFixed(1)}</span>
                : null
              }
            </span>
            <span className={'functional-badage-list'.concat(canEdit ? '' : ' invisible')}>
              <FixButton company={company} record={record} />
              <DeleteButton companySymbol={company.symbol} recordYear={record.year} />
            </span>
          </span>
        </div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 r-col">
        {/* Business Segments */}
        {
          record.businessSegments.length !== 0 ?
          record.businessSegments.map((segment, i) => (
            <span className="badage-attachment" key={i}>
              <span>{segment.business}</span>
              <span className="parameter-badage-list">
                {
                  segment.share ?
                  <span className="param-share">{segment.share.toFixed(1)}</span>
                  : null 
                }
                { 
                  segment.grossProfitMargin ?
                  <span className="param-gpm">
                  { segment.grossProfitMargin.toFixed(1) }
                  </span>
                  : null
                }
              </span>
            </span>
          ))
          : null
        }
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ep-col">
        {/* ActionsDone */}
        {
          record.actionsDone.length !== 0 ?
          <div className={showPlans ? 'pale' : ''}>
            { record.actionsDone.map((actionDone, i) => <div key={i}>· {actionDone}</div>) }
          </div>
          : null
        }

        {/* Plans */}
        {
          record.plans.length !== 0 ?
          <div className={showPlans ? '' : 'pale'}>
          {
            record.plans.map((unit, i) => (
              <span className="badage-attachment" key={i}>
                <span>· {unit.plan}</span>
                <span className="completion-badage">
                { unit.executed ? unit.executed : null }
                </span>
              </span>
            ))
          }
          </div>
          : null
        }
        </div>
      </div>
      <TagList tagList={record.keyList} />
    </div>
  )
}

export default connect(mapStateToProps, ()=>({}))(Record)

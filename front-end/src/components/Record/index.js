import React from 'react'
import { connect } from 'react-redux'

import FixButton from '../common/FixButton'
import DeleteButton from '../common/DeleteButton'
import './Record.css'

const mapStateToProps = state => ({
  company: state.recordList.company,
  showPlans: state.recordList.showPlans,
  canEdit: state.recordList.canEdit
})

const Record = props => {
  return (
    <div className="record">
      <div className="row">
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 t-col">
        {/* TIme Ref */}
          <span className="badage-attachment">
          { props.record.year.slice(0,4).concat(props.record.year.endsWith('M') ? '中' : '') }
            <span className="parameter-badage-list">
              {
                props.record.grossProfitMargin ?
                <span className="param-gpm">{props.record.grossProfitMargin.toFixed(1)}</span>
                : null
              }
            </span>
            {
              props.canEdit ?
              <span className="functional-badage-list">
                <FixButton company={props.company} record={props.record} />
                <DeleteButton companySymbol={props.company.symbol} recordYear={props.record.year} />
              </span>
              : null
            }
          </span>
        </div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 r-col">
        {/* Business Segments */}
        {
          props.record.businessSegments.length !== 0 ?
          props.record.businessSegments.map((segment, i) => (
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
          props.record.actionsDone.length !== 0 ?
          <div className={props.showPlans ? 'pale' : ''}>
            { props.record.actionsDone.map((actionDone, i) => <div key={i}>· {actionDone}</div>) }
          </div>
          : null
        }

        {/* Plans */}
        {
          props.record.plans.length !== 0 ?
          <div className={props.showPlans ? '' : 'pale'}>
          {
            props.record.plans.map((unit, i) => (
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
    </div>
  )
}

export default connect(mapStateToProps, ()=>({}))(Record)

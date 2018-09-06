import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BusinessSeg = ({
  unit, index, canEditBadages, onSwitch, changeAt,
  isNew, changeNewBusiness, changeNewShare, changeNewGrossProfitMargin, watchForEnter
}) => {
  return (
    <div className="col-xs-6">
      <span className="badage-attachment">
        <input className={ unit.newBusiness || unit.business ? 'record-filled' : '' } type="text" value={ isNew ? unit.newBusiness : unit.business } onChange={ isNew ? changeNewBusiness : changeAt(index, 'business') } onKeyUp={ isNew ? watchForEnter : null } />
        <span className="parameter-badage-list" onClick={() => onSwitch(index)}>
          <span className={'param-share'.concat(unit.newShare || unit.share ? ' record-filled' : '').concat(canEditBadages === index ? ' border-none' : '')}>
          {
            canEditBadages === index ?
            <input
              type="number"
              value={ isNew ? unit.newShare : unit.share }
              onChange={ isNew ? changeNewShare : changeAt(index, 'share')}
              onKeyUp={ev => ev.keyCode === 13 ? onSwitch('off') : null} />
            : unit.newShare || unit.share ?
            isNew ? unit.newShare : unit.share
            : <FontAwesomeIcon icon='chart-pie' />
          }
          </span>
          <span className={'param-gpm'.concat(unit.newGrossProfitMargin || unit.grossProfitMargin ? ' record-filled' : '').concat(canEditBadages === index ? ' border-none' : '')}>
          {
            canEditBadages === index ?
            <input
              type="number"
              value={ isNew ? unit.newGrossProfitMargin : unit.grossProfitMargin }
              onChange={ isNew ? changeNewGrossProfitMargin : changeAt(index, 'grossProfitMargin') }
              onKeyUp={ev => ev.keyCode === 13 ? onSwitch('off') : null} />
            : unit.newGrossProfitMargin || unit.grossProfitMargin ?
            isNew ? unit.newGrossProfitMargin : unit.grossProfitMargin
            : <FontAwesomeIcon icon={['far', 'handshake']} />
          }
          </span>
        </span>
      </span>
    </div>
  )
}

export default BusinessSeg

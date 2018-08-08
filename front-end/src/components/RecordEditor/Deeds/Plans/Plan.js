import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Plan = ({
  unit, index, canEditBadage, onSwitch, changeAt,
  isNew, changeNewPlan, changeNewExecuted, watchForEnter
 }) => {
  return (
    <span className={'badage-attachment'.concat(unit.newPlan || unit.plan ? ' record-filled' : '')}>
      <input type="text" value={ isNew ? unit.newPlan : unit.plan } onChange={ isNew ? changeNewPlan : changeAt(index, 'plan') } onKeyUp={ isNew ? watchForEnter : null } />
      <span className="completion-badage" onClick={() => onSwitch(index)}>
      {
        canEditBadage === index ?
        <input
          type="text"
          value={ isNew ? unit.newExecuted : unit.executed }
          onChange={ isNew ? changeNewExecuted : changeAt(index, 'executed') }
          onKeyUp={ev => ev.keyCode === 13 ? onSwitch('off') : null} />
        : unit.newExecuted || unit.executed ?
        <span>
          { isNew ? unit.newExecuted : unit.executed }
        </span>
        : <FontAwesomeIcon icon={['fab', 'fulcrum']} />
      }
      </span>
    </span>
  )
}

export default Plan

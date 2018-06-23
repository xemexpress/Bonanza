import React from 'react'

const SaveButton = props => {
  return (
    <button
      className="btn btn-outline-info"
      type="submit"
      disabled={props.inProgress}
      onClick={(ev)=>props.onSave(ev)}>
      Save
    </button>
  )
}

export default SaveButton

import React from 'react'

const SaveButton = props => {
  return (
    <button
      className={`btn btn-outline-info ${props.inProgress ? 'selected' : ''}`}
      type="submit"
      disabled={props.inProgress}
      onClick={(ev)=>props.onSave(ev)}>
      Save
    </button>
  )
}

export default SaveButton

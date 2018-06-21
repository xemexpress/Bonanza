import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
})

class CompanyEditor extends React.Component {
  render(){
    if(!this.props.currentUser){ return <Redirect to='/' /> }
    
    return (
      <div>
        This is CompanyEditor.
      </div>
    )
  }
}

export default connect(mapStateToProps, ()=>({}))(CompanyEditor)

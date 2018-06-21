import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
})

class CompanyList extends React.Component {
  render(){
    if(!this.props.currentUser){ return <Redirect to='/' /> }
    
    return (
      <div>This is CompanyList</div>
    )
  }
}

export default connect(mapStateToProps, ()=>({}))(CompanyList)

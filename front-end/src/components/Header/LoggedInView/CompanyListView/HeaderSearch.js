import React from 'react'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  
})

class HeaderSearch extends React.Component {
  constructor(){
    super()
    this.state = {
      search: ''
    }

    this.search = ev => this.setState({ search: ev.target.value })
  }

  render(){
    return (
      <form>
        <i className="fas fa-search"></i>
        <input
          className="search-company"
          type="text"
          placeholder="Search"
          value={this.state.search}
          onChange={this.search} />
        {
          this.state.search !== '' ?
          <i className="fas fa-times-circle"
              onClick={()=>this.setState({ search: '' })}></i>
          : null
        }
      </form>
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(HeaderSearch)

import React from 'react'
import { connect } from 'react-redux'

import LoggedOutView from './LoggedOutView'
import LoggedInView from './LoggedInView'
import './Header.css'

const scrollTolerance = 47
const mapStateToProps = state => ({
  company: state.recordList.company
})

class Header extends React.Component {
  constructor(){
    super()

    this.state = {
      headerHeight: 0,
      lastScrollTop: 0,
      className: 'header interaction-card'
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.hasScrolled = this.hasScrolled.bind(this)
  }

  instantHideHeader(){
    this.setState({ className: 'header interaction-card is-hidden no-animation'})
  }

  hideHeader(){
    this.setState({ className: 'header interaction-card is-hidden' })
  }

  showHeader(){
    this.setState({ className: 'header interaction-card' })
  }

  hasScrolled(){
    const nowScrollTopRef = window.scrollY
    const hasScrolledDown = nowScrollTopRef - this.state.lastScrollTop
    
    if(nowScrollTopRef === this.state.headerHeight){
      this.instantHideHeader()
    }

    if(hasScrolledDown < 0){
      this.showHeader()
    }else if(hasScrolledDown > scrollTolerance){
      this.hideHeader()
    }else{
       return 
    }
    this.setState({ lastScrollTop: nowScrollTopRef })
  }

  handleScroll(event){
    debounce(this.hasScrolled(), 77)
  }

  componentDidMount(){
    this.setState({ headerHeight: document.querySelector('.header').offsetHeight })
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  }

  render(){
    return (
      <nav className={this.state.className}>
      {/* Original */}
        <LoggedOutView currentUser={this.props.currentUser} appName={this.props.appName} />
        <LoggedInView
          currentUser={this.props.currentUser}
          locationHash={this.props.locationHash}
          company={this.props.company} appName={this.props.appName} />
      
      {/* Testing */}
        {/* <CompanyListView /> */}
        {/* <RecordsView /> */}
      </nav>
    )
  }
}

export default connect(mapStateToProps, ()=>({}))(Header)

function debounce(func, wait) {
  let timeout
  return function(...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}

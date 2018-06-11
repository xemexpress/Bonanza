import React from 'react'

import './Header.css'

const tolerance = 47

class Header extends React.Component {
  constructor(){
    super()
    this.state = {
      headerHeight: 0,
      lastScrollTop: 0,
      className: 'header'
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.hasScrolled = this.hasScrolled.bind(this)
  }

  instantHideHeader(){
    this.setState({ className: 'header is-hidden no-animation'})
  }

  hideHeader(){
    this.setState({ className: 'header is-hidden' })
  }

  showHeader(){
    this.setState({ className: 'header' })
  }

  hasScrolled(){
    const nowScrollTopRef = window.scrollY
    const hasScrolledDown = nowScrollTopRef - this.state.lastScrollTop
    
    if(nowScrollTopRef === this.state.headerHeight){
      this.instantHideHeader()
    }

    if(hasScrolledDown < 0){
      this.showHeader()
    }else if(hasScrolledDown > tolerance){
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
        { this.props.appName.toLowerCase() }
      </nav>
    )
  }
}

export default Header

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

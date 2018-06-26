import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import ListErrors from './ListErrors'
import TagList from './TagList'

import {
  UPDATE_FIELD_COMPANY_EDITOR,
  COMPANY_EDITOR_PAGE_UNLOADED,
  REMOVE_TAG,
  ADD_TAG
} from '../constants'

const mapStateToProps = state => ({
  ...state.companyEditor,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onUpdateField: (key, value) => dispatch({
    type: UPDATE_FIELD_COMPANY_EDITOR,
    key,
    value
  }),
  onAddTag: () => dispatch({
    type: ADD_TAG
  }),
  onRemoveTag: index => dispatch({
    type: REMOVE_TAG,
    index
  }),
  onUnload: () => dispatch({
    type: COMPANY_EDITOR_PAGE_UNLOADED
  })
})

class CompanyEditor extends React.Component {
  constructor(){
    super()
    this.state = {
      checked: false
    }

    this.expand = ev => {
      ev.preventDefault()

      this.setState({ checked: !this.state.checked })
    }

    const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value)
    this.changeSymbol = updateFieldEvent('symbol')
    this.changeName = updateFieldEvent('name')
    this.changeAbbr = updateFieldEvent('abbr')
    this.changeLink = updateFieldEvent('link')
    this.changeTagInput = updateFieldEvent('tagInput')
    this.changeLogo = updateFieldEvent('logo')

    this.watchForEnter = ev => {
      ev.preventDefault()
      if(ev.keyCode === 13 && ev.target.value !== ''){ this.props.onAddTag() }
    }

    this.removeTag = index => ev => {
      ev.preventDefault()
      this.props.onRemoveTag(index)
    }
  }

  componentWillMount(){
    if(this.props.updatedAt){
      this.setState({ checked: true })
    }
  }

  componentWillUnmount(){
    this.props.onUnload()
  }
  
  render(){
    if(!this.props.currentUser){ return <Redirect to='/' /> }
    
    let { symbol, name, abbr, logo, link, tagInput, tagList } = this.props

    return (
      <div className="row">
        <div className="offset-lg-4 col-lg-4 offset-md-3 col-md-6 offset-sm-2 col-sm-8 offset-xs-1 col-xs-10">
          <ListErrors errors={this.props.errors} />

          <div className="interaction-card form-control">
            <form>
              <fieldset>
                <label>Symbol</label>
                <input
                  type="text"
                  value={symbol}
                  onChange={this.changeSymbol} />

                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={this.changeName} />

                <label onClick={this.expand}>
                  {
                    this.state.checked ?
                    <i className="fas fa-angle-down"></i>
                    : <i className="fas fa-angle-right"></i>
                  }
                </label>
                {
                  this.state.checked ?
                  <span>
                    <label>Abbr.</label>
                    <input
                      type="text"
                      value={abbr}
                      onChange={this.changeAbbr} />

                    <label>Link</label>
                    <input
                      type="text"
                      value={link}
                      onChange={this.changeLink} />

                    <label>
                      Tags
                      <TagList
                        tagList={tagList}
                        removeTag={this.removeTag} />
                    </label>
                    <input
                      type='text'
                      value={tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter} />

                    <label>Logo</label>
                    <input
                      type="text"
                      value={logo}
                      onChange={this.changeLogo} />
                  {
                    logo ?
                    <span>
                      <label>Preview:</label>
                      <img className="center-image" src={logo} alt="logo-preview" />
                    </span>
                    : null
                  }
                  </span>
                  : null
                }
              </fieldset>
            </form>
          </div>
          <br />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyEditor)

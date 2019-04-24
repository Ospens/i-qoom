import React, { Component } from 'react'
import classnames from 'classnames'

class DropDown extends Component {

  state = {
    isOpen: false
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node
  }

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target.closest('.btn-group'))) {
      this.setState({ isOpen: false })
    }
  }
  render() {
    const { btnName, children, className, btnClass } = this.props
    const { isOpen } = this.state
    const mainClass = classnames(className, 'btn-group', { 'show': isOpen })
    const ddClass = classnames('dropdown-menu', { 'show': isOpen })
    const customBtnClass = btnClass ? btnClass : 'btn btn-white-blue'
    return (
      <div className={mainClass}
        ref={this.setWrapperRef}>
        <button
          type='button'
          className={`${customBtnClass} dropdown-toggle`}
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded={isOpen}
          onClick={() => this.setState({ isOpen: !isOpen })}
        >
          <span>{btnName}</span>
        </button>
        <div className={ddClass}>
          {children}
        </div>
      </div>
    )
  }
}

export default DropDown

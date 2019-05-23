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
    const { btnName, children, className, btnClass, btnComponent } = this.props
    const { isOpen } = this.state
    const mainClass = classnames(className, 'btn-group', { 'show': isOpen })
    const ddClass = classnames('dropdown-menu', { 'show': isOpen })
    const iClass = classnames('arrow ml-4', { 'up': isOpen }, { 'down': !isOpen })
    const customBtnClass = btnClass ? btnClass : 'btn btn-white-blue'

    return (
      <div className={mainClass}
        ref={this.setWrapperRef}>
        <button
          type='button'
          className={`${customBtnClass}`}
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded={isOpen}
          onClick={() => this.setState({ isOpen: !isOpen })}
        >
          {btnComponent ? (
            btnComponent
          ) : (
            <React.Fragment>
              <span className='mx-auto'>{btnName}</span>
              <i className={iClass}/>
            </React.Fragment>
          )}
        </button>
        <ul className={ddClass}>
          {children}
        </ul>
      </div>
    )
  }
}

export default DropDown

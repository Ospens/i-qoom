import React, { Component } from 'react'
import classnames from 'classnames'

class DropDown extends Component {

  state = {
    isOpen: false
  }

  render() {
    const { btnName, children, className } = this.props
    const { isOpen } = this.state
    const mainClass = classnames(className, 'btn-group', { 'show': isOpen })
    const ddClass = classnames('dropdown-menu', { 'show': isOpen })
    return (
      <div className={mainClass}>
        <button
          type='button'
          className='btn btn-white-blue dropdown-toggle'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded={isOpen}
          onClick={() => this.setState({ isOpen: !isOpen })}
        >
          {btnName}
        </button>
        <div className={ddClass}>
          {children}
        </div>
      </div>
    )
  }
}

export default DropDown

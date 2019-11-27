import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

export function defaultItems(items) {
  return (
    items.map(({ icon, title, onClick, link }, i) => (
      link
        ? <li className='dropdown-item' onClick={onClick} key={i}>
            <Link className='d-flex' to={link}>
              <div className='icon-container'>
                <span className={icon} />
              </div>
            <span className='item-text'>{title}</span>
            </Link>
          </li>
        : <li className='dropdown-item' onClick={onClick} key={i}>
            <div className='icon-container'>
              <span className={icon} />
            </div>
            <span className='item-text'>{title}</span>
          </li>
    ))
  )
}

class DropDown extends Component {

  state = {
    isOpen: false
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    const { openState } = this.props
    if (openState) {
      openState(nextState.isOpen)
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  renderDotsIcon = () => <div className='dots-container'><span className='icon-navigation-menu-horizontal' /></div>

  setWrapperRef = node => {
    this.wrapperRef = node
  }

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target.closest('.btn-group'))
        || event.target.className.includes('cancel-button')) {
      this.setState({ isOpen: false })
    }
  }

  render() {
    const {
      btnName,
      children,
      className,
      btnClass,
      btnComponent,
      dots,
      defaultValues,
      ulClass
    } = this.props
    const { isOpen } = this.state
    const mainClass = classnames('btn-group drop-down', className, { 'show': isOpen })
    const ddClass = classnames(
      'dropdown-menu',
      { 'show': isOpen },
      { [ulClass]: ulClass }
    )
    const iClass = classnames('arrow ml-4', { 'up': isOpen }, { 'down': !isOpen })
    const customBtnClass = classnames(
      { 'btn-white-blue btn': !btnClass && !dots },
      { [btnClass]: btnClass },
      { 'with-dots': dots }
    )

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
          {(() => {
            if (btnComponent) {
              return btnComponent
            } else if (dots) {
              return this.renderDotsIcon()
            } else {
              return (
                <React.Fragment>
                  <span className='mx-auto'>{btnName}</span>
                  <i className={iClass} />
                </React.Fragment>
              )
            }
          })()}
        </button>
        <ul className={ddClass}>
          {defaultValues ? defaultItems(defaultValues) : children}
        </ul>
      </div>
    )
  }
}

export default DropDown

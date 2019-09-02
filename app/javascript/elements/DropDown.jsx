import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import classnames from 'classnames'

class DropDown extends Component {

  state = {
    isOpen: false
  }

  componentWillUpdate(nextProps, nextState) {
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

  renderDotsIcon = () => <div className='dots-container'><i className='svg-icon dots-icon' /></div>

  renderDefaultItems = actionDDitems => (
    actionDDitems.map(({ icon, title, onClick }, i) => (
      <React.Fragment key={i}>
        <li
          className='dropdown-item'
          onClick={onClick}
        >
          <ReactSVG
            svgStyle={{ height: 15, width: 15 }}
            src={icon}
          />
          <span className='item-text'>
            {title}
          </span>
        </li>
      </React.Fragment>
    ))
  )

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
      { 'btn-white-blue': !btnClass },
      { [btnClass]: btnClass },
      { 'btn': !dots },
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
          {defaultValues ? this.renderDefaultItems(defaultValues) : children}
        </ul>
      </div>
    )
  }
}

export default DropDown

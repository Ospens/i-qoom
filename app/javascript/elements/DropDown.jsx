import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import classnames from 'classnames'
import dots from '../images/dots-horizontal'

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

  renderDotsIcon = () => {
    const { dotsStyles } = this.props
    return (
      <ReactSVG
        svgStyle={dotsStyles ? dotsStyles : { height: 15, width: 15 }}
        src={dots}
      />
    )
  }

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
    if (this.wrapperRef && !this.wrapperRef.contains(event.target.closest('.btn-group'))) {
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
    const mainClass = classnames(className, 'btn-group', { 'show': isOpen })
    const ddClass = classnames(
      'dropdown-menu',
      { 'show': isOpen },
      { [ulClass]: ulClass }
    )
    const iClass = classnames('arrow ml-4', { 'up': isOpen }, { 'down': !isOpen })
    // const customBtnClass = btnClass ? btnClass : 'btn btn-white-blue'
    const customBtnClass = classnames(
      { 'btn btn-white-blue': !btnClass },
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
          {defaultValues ? this.renderDefaultItems(defaultValues) : children}
        </ul>
      </div>
    )
  }
}

export default DropDown

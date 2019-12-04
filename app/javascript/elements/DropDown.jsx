import React, {
  useRef, useState, useEffect, useCallback
} from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

export function defaultItems(items) {
  return (
    items.map(({
      icon, title, onClick, link, disabled
    }) => {
      const key = `${icon}_${title}`
      const className = classnames('dropdown-item', { disabledItem: disabled })
      return (
        link
          ? (
            <li className={className} key={key}>
              <Link className="d-flex" to={link}>
                <div className="icon-container">
                  <span className={icon} />
                </div>
                <span className="item-text">{title}</span>
              </Link>
            </li>
          )
          : (
            <li className={className} key={key}>
              <button type="button" disabled={disabled} onClick={onClick}>
                <div className="icon-container">
                  <span className={icon} />
                </div>
                <span className="item-text">{title}</span>
              </button>
            </li>
          ))
    })
  )
}

function DotsIcon() {
  return <div className="dots-container"><span className="icon-navigation-menu-horizontal" /></div>
}

function DropDown({
  openState,
  btnName,
  children,
  className,
  btnClass,
  btnComponent,
  dots,
  defaultValues,
  ulClass
}) {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)

  const handleClickOutside = useCallback(event => {
    if ((ref && !ref.current.contains(event.target.closest('.btn-group')))
      || event.target.className.includes('cancel-button')) {
      setOpen(false)
    }
  }, [ref])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  useEffect(() => {
    if (!openState) return

    openState(open)
  }, [openState, open])

  const mainClass = classnames('btn-group drop-down', className, { show: open })
  const ddClass = classnames(
    'dropdown-menu',
    { show: open },
    { [ulClass]: ulClass }
  )
  const iClass = classnames('arrow ml-4', { up: open }, { down: !open })
  const customBtnClass = classnames(
    { 'btn-white-blue btn': !btnClass && !dots },
    { [btnClass]: btnClass },
    { 'with-dots': dots }
  )

  return (
    <div className={mainClass} ref={ref}>
      <button
        type="button"
        className={`${customBtnClass}`}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {(() => {
          if (btnComponent) {
            return btnComponent
          } if (dots) {
            return <DotsIcon />
          }
          return (
            <React.Fragment>
              <span className="mx-auto">{btnName}</span>
              <i className={iClass} />
            </React.Fragment>
          )
        })()}
      </button>
      <ul className={ddClass}>
        {defaultValues ? defaultItems(defaultValues) : children}
      </ul>
    </div>
  )
}

export default DropDown

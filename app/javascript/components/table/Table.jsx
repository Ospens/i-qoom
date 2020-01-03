import React from 'react'
import classnames from 'classnames'

export function Table({ children, className, separated }) {
  const cn = classnames('Rtable', className, { separate: separated })
  return (
    <div className="Rtable-container">
      <div className={cn}>
        {children}
      </div>
    </div>
  )
}

export function Header({ children, className }) {
  const cn = classnames('Rtable__header', className)
  return (
    <div className={cn}>
      {children}
    </div>
  )
}

export function HeaderRow({ children, className }) {
  const cn = classnames('Rtable-row', className)
  return (
    <div className={cn}>
      {children}
    </div>
  )
}

export function HeaderCell({ children, className }) {
  const cn = classnames('Rtable__row-cell', className)
  return (
    <div className={cn}>
      {children
        && (
          <div className="Rtable__row-cell__header">
            {children}
          </div>
        )}
    </div>
  )
}

export function Body({
  component: Component, children, className, stripped = true
}) {
  const cn = classnames('Rtable__body', className, { 'non-stripped': !stripped })
  // Component component is needed for TransitionGroup
  if (Component) {
    return (
      <Component className={cn}>
        {children}
      </Component>
    )
  }
  return (
    <div className={cn}>
      {children}
    </div>
  )
}

export function BodyRow({
  children, className, checked, bordered
}) {
  const cn = classnames('Rtable-row', className,
    { 'Rtable-row__checked': checked },
    { 'event-border': bordered })
  return (
    <div className={cn}>
      {children}
    </div>
  )
}

export function BodyCell({ children, className }) {
  const cn = classnames('Rtable__row-cell', className)
  return (
    <div className={cn}>
      {children}
    </div>
  )
}

export default Table

import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

function Tab({ toggleTab, activeTab, label }) {
  return (
    <li className='nav-bar-item'>
      <button
        type='button'
        className={classnames('nav-bar-element', { 'active': activeTab === label })}
        onClick={() => toggleTab(label)}
      >
        {label}
      </button>
    </li>
  )
}

export default function Tabs({ children, className, scrollable, oneTab }) {
  const [activeTab, toggleTab] = useState('')
  const mainClass = classnames('tabs', className)
  useEffect(() => {
    if (oneTab) {
      toggleTab(children.props.label)
      return
    }
    const tab = children[0].props.label
    toggleTab(tab)
  }, [])
  
  if (oneTab) {
    return (
      <div className={mainClass}>
        <ol className='nav-bar'>
          <Tab
            activeTab={activeTab}
            label={children.props.label}
            toggleTab={toggleTab}
          />
        </ol>
        <div className={classnames('tab-content', { scrollable })}>
          {children}
        </div>
      </div>
    )
  } 

  return (
    <div className={mainClass}>
      <ol className='nav-bar'>
        {children.map((child, i) => {
          const { label } = child.props
          return (
            <Tab
              key={i}
              activeTab={activeTab}
              label={label}
              toggleTab={toggleTab}
            />
          )
        })}
      </ol>
      <div className={classnames('tab-content', { scrollable })}>
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined
          return child
        })}
      </div>
    </div>
  )
}

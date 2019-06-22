import React, { Component } from 'react'
import classnames from 'classnames'

class Tab extends Component {
  render() {
    const { onClick, activeTab, label } = this.props

    return (
      <li className='nav-bar-item'>
        <button
          type='button'
          className={classnames('nav-bar-element', { 'active': activeTab === label })}
          onClick={() => onClick(label)}
        >
          {label}
        </button>
      </li>
    )
  }
}

export default class Tabs extends Component {

  state = {
    activeTab: this.props.children[0].props.label
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab })
  }

  render() {
    const { children, className } = this.props
    const { activeTab } = this.state
    const mainClass = classnames('tabs', className)
    
    return (
      <div className={mainClass}>
        <ol className='nav-bar'>
          {children.map((child) => {
            const { label } = child.props
            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={() => this.onClickTabItem(label)}
              />
            )
          })}
        </ol>
        <div className='tab-content'>
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined
            return child
          })}
        </div>
      </div>
    )
  }
}

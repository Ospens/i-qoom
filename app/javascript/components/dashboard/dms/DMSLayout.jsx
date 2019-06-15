import React, { Component } from 'react'

export default class DMSLayout extends Component {
  render() {
    const { header, sidebar, content } = this.props

    return (
      <div className='dms-container'>
        {header}
        <div className='row pt-5'>
          <div className='col-2'>
            {sidebar}
          </div>
          <div className='col-10'>
            {content}
          </div>
        </div>
      </div>
    )
  }
}

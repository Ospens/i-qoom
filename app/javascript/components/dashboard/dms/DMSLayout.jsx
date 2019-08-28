import React from 'react'

export default function DMSLayout({ header, sidebar, content }) {
  return (
    <div className='dms-container'>
      {header}
      <div className='row'>
        <div className='col-2'>
          {sidebar}
        </div>
        <div className='col-10 pl-5'>
          {content}
        </div>
      </div>
    </div>
  )
}

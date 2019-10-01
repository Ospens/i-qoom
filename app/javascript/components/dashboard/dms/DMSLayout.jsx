import React from 'react'
import classnames from 'classnames'

export default function DMSLayout({ header, sidebar, content, classNames }) {
  return (
    <div className={classnames('dms-container', classNames )}>
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

import React from 'react'
import classnames from 'classnames'

export default function DMSLayout({
  header, sidebar, content, classNames
}) {
  return (
    <div className={classnames('dms-container', classNames, { 'without-sidebar': !sidebar })}>
      {header}
      <div className="d-flex">
        {sidebar && (
          <div className="sidemenu-column">
            {sidebar}
          </div>
        )}
        <div className="content-column">
          {content}
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import classnames from 'classnames'

function FileIcon({ className, filename = '' }) {
  const fileInfo = filename.match(/\.[0-9a-z]+$/i)
  const fileExtension = fileInfo ? fileInfo[0] : ''
  let iconClassName = 'icon-common-file-text1'

  if (fileExtension === '.pdf') {
    iconClassName = 'icon-Work-Office-Companies---Office-Files---office-file-pdf'
  } else if (['.doc', '.docs', '.docx'].includes(fileExtension)) {
    iconClassName = 'icon-office-file-doc'
  } else if (fileExtension === '.csv') {
    iconClassName = 'icon-csv-1'
  } else if (fileExtension === '.xml') {
    iconClassName = 'icon-xml-1'
  } else {
    return (
      <span className={classnames(className, 'icon-common-file-text_big')}>
        <span className="path1" />
        <span className="path2" />
        <span className="path3" />
        <span className="path4" />
      </span>
    )
  }

  return <i className={classnames(className, iconClassName)} />
}

export default FileIcon

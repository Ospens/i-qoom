import React from 'react'
import classnames from 'classnames'

const icons = {
  '.pdf': 'icon-Work-Office-Companies---Office-Files---office-file-pdf',
  '.doc': 'icon-office-file-doc',
  '.docs': 'icon-office-file-doc',
  '.docx': 'icon-office-file-doc',
  '.docm': 'icon-office-file-doc',
  '.dot': 'icon-office-file-doc',
  '.dotm': 'icon-office-file-doc',
  '.dotx': 'icon-office-file-doc',
  '.csv': 'icon-csv-1',
  '.xml': 'icon-xml-1',
  '.xls': 'icon-office-file-xls',
  '.xlsx': 'icon-office-file-xls',
  '.xlt': 'icon-office-file-xls',
  '.dra': 'icon-streamline-icon-file-draw-124x24-01',
  '.rar': 'icon-streamline-icon-file-rar-124x24',
  '.zip': 'icon-streamline-icon-file-zip-124x24',
  '.key': 'icon-streamline-icon-office-file-key24x24',
  '.pps': 'con-streamline-icon-office-file-pps24x24',
  '.ppt': 'icon-streamline-icon-office-file-ppt24x24',
  '.rtf': 'icon-streamline-icon-office-file-rtf24x24',
  '.txt': 'icon-streamline-icon-office-file-txt24x24'
}

function FileIcon({ className, filename = '' }) {
  const fileInfo = filename.match(/\.[0-9a-z]+$/i)
  const fileExtension = fileInfo ? fileInfo[0] : ''
  const iconClassName = icons[fileExtension]
  if (!iconClassName) {
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

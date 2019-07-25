import emailSendIcon from '../../../images/email-action-send-2'
import copyToFolderIcon from '../../../images/folder-empty'
import showDetailsIcon from '../../../images/common-file-text'
import downloadDetailsIcon from '../../../images/download-button'
import reviewDocIcon from '../../../images/single-neutral-actions-text'
import editDocIcon from '../../../images/common-file-edit'
import revisionIcon from '../../../images/Revise_2'
import allDocIcon from '../../../images/folder-image'
import myDocIcon from '../../../images/folder-image-1'

export const actionDDitems = [
  {
    title: 'Email',
    icon: emailSendIcon
  },
  {
    title: 'Copy to folder',
    icon: copyToFolderIcon
  },
  {
    title: 'Show details',
    icon: showDetailsIcon
  },
  {
    title: 'Download Files',
    icon: downloadDetailsIcon
  },
  {
    title: 'Edit document',
    icon: editDocIcon
  },
  {
    title: 'Add revision',
    icon: revisionIcon
  },
  {
    title: 'Review document',
    icon: reviewDocIcon
  },
  {
    title: 'Download as list',
    icon: downloadDetailsIcon
  }
]

export const columns = [
  { title: 'DOC-ID', divider: true },
  { title: 'Document Title', divider: true },
  { title: 'DL', divider: true },
  { title: 'Native', divider: true },
  { title: 'Additional', divider: true },
  { title: 'Revision', divider: true },
  { title: 'Version', divider: true }
]

export const DtOptions = [
  {
    key: 'certification',
    title: 'Certification'
  },
  {
    key: 'contracts',
    title: 'Contracts'
  },
  {
    key: 'dataSheets',
    title: 'Data Sheets'
  },
  {
    key: 'drawings',
    title: 'Drawings'
  },
  {
    key: 'hsse',
    title: 'HSSE'
  },
  {
    key: 'letters',
    title: 'Letters'
  },
  {
    key: 'reports',
    title: 'Reports'
  },
  {
    key: 'shedules',
    title: 'Shedules'
  }
]

export const reviewStatuses = [
  {
    title: 'Accepted',
    color: 'green',
    count: 23
  },
  {
    title: 'In progress',
    color: 'yellow',
    count: 77
  },
  {
    title: 'Rejected',
    color: 'red',
    count: 0
  },
  {
    title: 'IRF/IFA',
    color: 'gray',
    count: 0
  }
]

export const foldersItems = [
  {
    title: 'All documents',
    icon: allDocIcon
  },
  {
    title: 'My documents',
    icon: myDocIcon
  }
]

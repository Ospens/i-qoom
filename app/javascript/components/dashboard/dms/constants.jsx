export const actionDDitems = (projectId, documentId) => (
  [
    {
      title: 'Email',
      icon: 'icon-email-action-send-2'
    },
    {
      title: 'Copy to folder',
      icon: 'icon-folder-empty'
    },
    {
      title: 'Show details',
      icon: 'icon-common-file-text-1',
      link: `/dashboard/projects/${projectId}/documents/${documentId}`
    },
    {
      title: 'Download Files',
      icon: 'icon-download-button'
    },
    {
      title: 'Edit document',
      icon: 'icon-common-file-edit',
      link: `/dashboard/projects/${projectId}/documents/${documentId}/edit`
    },
    {
      title: 'Add revision',
      icon: 'icon-Revise_1'
    },
    {
      title: 'Review document',
      icon: 'icon-single-neutral-actions-text-1'
    }
  ]
)

export const columns = [
  { title: 'DOC-ID', divider: true, searchable: true, sortable: 'doc_id' },
  { title: 'Document title', divider: true, searchable: true, sortable: 'title' },
  { title: 'DL', divider: true },
  { title: 'Native', divider: true },
  { title: 'Additional', divider: true },
  { title: 'Revision date', divider: true, sortable: 'revision_date'},
  { title: 'Discipline', divider: true, searchable: true, sortable: 'discipline' },
  { title: 'Document type', divider: true, searchable: true, sortable: 'document_type' },
  { title: 'Originating company', divider: true, searchable: true, sortable: 'originating_company' }
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

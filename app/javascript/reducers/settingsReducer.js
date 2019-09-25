import { } from '../actions/types'

const initialState = {
  overview: [
    {
      title: 'Project phase',
      enabled: true
    },
    {
      title: 'Originating Company',
      enabled: false
    },
    {
      title: 'Document Types',
      enabled: false
    },
    {
      title: 'Title',
      enabled: false
    },
    {
      title: 'Relevance I',
      enabled: true
    },
    {
      title: 'Status AAA',
      enabled: false
    },
    {
      title: 'Status XXX',
      enabled: false
    },
    {
      title: 'Status YYY',
      enabled: false
    },
    {
      title: 'Status ZZZ',
      enabled: false
    }
  ],
  uploadForm: [],
  quickSearch: [
    {
      title: 'Project phase',
      enabled: true
    },
    {
      title: 'Status YYY',
      enabled: true
    },
    {
      title: 'Originating Company',
      enabled: true,
      values: [
        {
          title: 'Cable',
          enabled: true
        },
        {
          title: 'Certification',
          enabled: false
        },
        {
          title: 'Commercial',
          enabled: false
        },
        {
          title: 'Q&M',
          enabled: false
        }
      ]
    },
    {
      title: 'Status ZZZ',
      enabled: false
    }
  ],
  codification: []
}

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
  default:
    return state
  }
}

export default settingsReducer

import { } from '../actions/types'

const initialState = {
  current: {
    1: [
      {
        title: 'Project phase',
        enabled: true,
        position: 0
      },
      {
        title: 'Originating Company',
        enabled: true,
        position: 1,
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
        title: 'Originating Company',
        enabled: false,
        position: 2
      }
    ],
    2: [
      {
        title: 'Document Types',
        enabled: false,
        position: 0
      },
      {
        title: 'Title',
        enabled: true,
        position: 1
      },
      {
        title: 'Relevance I',
        enabled: true,
        position: 2
      },
      {
        title: 'Relevance II',
        enabled: true,
        position: 2
      }
    ]
  }
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
  default:
    return state
  }
}

export default filterReducer

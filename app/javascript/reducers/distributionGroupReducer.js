import { } from '../actions/types'

const initialState = {
  dgGroups: [
    {
      id: 1,
      title: 'First distribution group',
      members: [
        {
          id: 1,
          name: 'member 1',
          master: false,
          company: 'Some company'
        },
        {
          id: 2,
          name: 'member 2',
          master: true,
          company: 'Some company'
        }
      ]
    },

    {
      id: 2,
      title: 'Second distribution group',
      members: [
        {
          id: 3,
          name: 'member 3',
          master: false,
          company: 'A company'
        },
        {
          id: 4,
          name: 'member 4',
          master: true,
          company: 'A company'
        },
        {
          id: 5,
          name: 'member 5',
          master: true,
          company: 'A company'
        },
        {
          id: 6,
          name: 'member 6',
          master: false,
          company: 'A company'
        },
        {
          id: 7,
          name: 'member 7',
          master: false,
          company: 'A company'
        },
        {
          id: 8,
          name: 'member 8',
          master: true,
          company: 'A company'
        }
      ]
    }
  ]
}

const distributionGroupReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'D_G_TEST':
    return {
      ...initialState
    }
  default:
    return state
  }
}

export default distributionGroupReducer

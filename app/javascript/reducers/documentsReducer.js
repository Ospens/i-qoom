import {
  DOCUMENT_CREATE_SUCCESS,
  DOCUMENT_FETCH_SUCCESS,
  DOCUMENTS_FETCH_SUCCESS,
  EDIT_DOCUMENT,
  REVISIONS_AND_VERSIONS_FETCH_SUCCESS,
  DOCUMENTS_FETCHED_WITHOUT_FILTERS_SUCCESS,
  TOGGLE_FILTERS,
  TOGGLE_LOADING,
  TOGGLE_SEARCH_FILTERS,
  CREATING_DOCUMENT,
  DMS_USERS_FETCHED,
  DOCUMENTS_SORTED
} from '../actions/types'

const initialState = {
  loading: false,
  sortBy: { column: 'title', order: 'asc' },
  searchFilters: {
    filters: [],
    search: '',
    document_title: ''
  },
  allDocuments: [],
  users: [],
  discipline: [],
  originating_companies: [],
  document_types: [],
  revisions: [],
  current: {
    document_fields: [],
    grouped_fields: {
      column_1: [{}],
      column_2: [{}]
    }
  }
}

function transformatedDocuments(documents) {
  return documents.map(d => (
    {
      ...d,
      originating_company: d.document_fields.find(el => el.codification_kind === 'originating_company').document_field_values.find(({ selected }) => selected).title,
      document_type: d.document_fields.find(el => el.codification_kind === 'document_type').document_field_values.find(({ selected }) => selected).title,
      discipline: d.document_fields.find(el => el.codification_kind === 'discipline').document_field_values.find(({ selected }) => selected).title,
      revision_date: d.document_fields.find(el => el.codification_kind === 'revision_date').value
    }
  ))
}

const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
  case TOGGLE_LOADING:
    return {
      ...state,
      loading: action.payload
    }
  case DOCUMENT_CREATE_SUCCESS:
    return {
      ...state,
      ...action.payload
    }
  case DOCUMENTS_FETCH_SUCCESS:
    return {
      ...state,
      allDocuments: transformatedDocuments(action.payload.documents),
      originating_companies: action.payload.originating_companies
        .map(oc => ({ value: oc[0], title: oc[1], checked: true })),
      document_types: action.payload.document_types
        .map(dt => ({ value: dt[0], title: dt[1], checked: true })),
      discipline: action.payload.discipline
        .map(d => ({ value: d[0], title: d[1], checked: true }))
    }
  case DOCUMENTS_FETCHED_WITHOUT_FILTERS_SUCCESS:
    return {
      ...state,
      allDocuments: transformatedDocuments(action.payload.documents)
    }
  case TOGGLE_FILTERS:
    return {
      ...state,
      [action.payload.type]: state[action.payload.type]
        .map(el => (el.value === action.payload.value ? { ...el, checked: !el.checked } : el))
    }
  case TOGGLE_SEARCH_FILTERS:
    return {
      ...state,
      searchFilters: {
        ...state.searchFilters,
        ...action.payload
      }
    }
  case DOCUMENT_FETCH_SUCCESS:
    return {
      ...state,
      current: action.payload
    }
  case CREATING_DOCUMENT:
    return {
      ...state,
      current: {
        ...state.current,
        ...action.payload
      }
    }
  case EDIT_DOCUMENT:
    return {
      ...state,
      current: {
        ...state.current,
        ...action.payload
      }
    }
  case REVISIONS_AND_VERSIONS_FETCH_SUCCESS:
    return {
      ...state,
      revisions: action.payload
    }
  case DOCUMENTS_SORTED:
    return {
      ...state,
      sortBy: {
        column: action.payload.column,
        order: action.payload.order
      },
      allDocuments: transformatedDocuments(action.payload.documents)
    }
  case DMS_USERS_FETCHED:
    return {
      ...state,
      users: action.payload
    }
  default:
    return state
  }
}

export default documentsReducer

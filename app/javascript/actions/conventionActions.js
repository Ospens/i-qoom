import axios from 'axios'
import {
  EDITING_CONVENTION,
  UPDATED_FIELDS,
  ORDER_FIELDS,
  EDITING_FIELD,
  REMOVE_FIELD,
  DISCARD_EDIT_VALUES,
  CONVENTION_UPDATED,
  DISCARD_CONVENTION
} from './types'
import { errorNotify } from '../elements/Notices'


const fieldByColumn = data => {
  const sorted = data.document_fields.reduce((accumulator, currentValue) => {
    accumulator[currentValue.column].push(currentValue)
    return accumulator
  }, { 1: [], 2: [] })

  sorted[1].sort((a, b) => a.row - b.row)
  sorted[2].sort((a, b) => a.row - b.row)
  data.grouped_fields = sorted
  return data
}

const editingConvention = payload => ({
  type: EDITING_CONVENTION,
  payload
})

const conventionUpdated = payload => ({
  type: CONVENTION_UPDATED,
  payload
})

export const discardConvention = () => ({
  type: DISCARD_CONVENTION
})

export const startUpdateConvention = () => (dispatch, getState) => {
  const { user: { token }, conventions: { current }, projects } = getState()
  const projectId = projects.current.id
  const headers = {
    Authorization: token
  }
  const docFields = []
  Object.keys(current.grouped_fields).forEach(k => {
    current.grouped_fields[k].forEach((row, i) => {
      const newRow = {
        ...row,
        column: k,
        row: i + 1
      }
      docFields.push(newRow)
    })
  })

  const request = {
    convention: {
      document_fields_attributes: docFields
    }
  }

  return (
    axios.put(`/api/v1/projects/${projectId}/conventions/`, request, {
      headers
    })
      .then(response => {
        const { data } = response
        const sortedData = fieldByColumn(data)

        dispatch(conventionUpdated(sortedData))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const startEditConvention = () => (dispatch, getState) => {
  const { user: { token }, projects: { current } } = getState()
  const headers = {
    Authorization: token
  }

  return (
    axios.get(`/api/v1/projects/${current.id}/conventions/edit`, {
      headers
    })
      .then(response => {
        const { data } = response
        const sortedData = fieldByColumn(data)
        console.log(sortedData)
        dispatch(editingConvention(sortedData))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const removeField = (column, row) => (dispatch, getState) => {
  const { conventions: { current: { grouped_fields } } } = getState()
  const newColumn = new Array(...grouped_fields[column])
  newColumn.splice(row, 1)

  const newFields = {
    ...grouped_fields,
    [column]: newColumn
  }

  return dispatch({
    type: REMOVE_FIELD,
    payload: newFields
  })
}

export const updateFields = (field, edit = false) => (dispatch, getState) => {
  const { conventions: { current: { grouped_fields } } } = getState()
  const { column, row } = field
  const newColumn = new Array(...grouped_fields[column])

  if (edit) {
    newColumn.splice(row, 1, field)
  } else {
    newColumn.splice(row, 0, field)
  }

  const newFields = {
    ...grouped_fields,
    [column]: newColumn
  }

  return dispatch({
    type: UPDATED_FIELDS,
    payload: newFields
  })
}

export const setInitialValuesField = field => dispatch => dispatch({
  type: EDITING_FIELD,
  payload: field
})

export const discardInitialValues = () => ({ type: DISCARD_EDIT_VALUES })

export const reorderFields = (result, fields) => dispatch => {
  const { destination, source } = result
  let { draggableId } = result
  draggableId = draggableId.replace(/column_(.)_/g, '')

  if (!destination) return

  if (
    destination.droppableId === source.droppableId
    && destination.index === source.index
  ) {
    return
  }

  if (source.droppableId === destination.droppableId) {
    const column = fields[source.droppableId]
    const newFields = new Array(...column)

    newFields.splice(source.index, 1)
    newFields.splice(destination.index, 0, column[draggableId])

    const orderedFields = {
      ...fields,
      [source.droppableId]: newFields
    }

    return dispatch({
      type: ORDER_FIELDS,
      payload: orderedFields
    })
  }

  const startColumn = fields[source.droppableId]
  const startFields = new Array(...startColumn)

  startFields.splice(source.index, 1)

  const finishColumn = fields[destination.droppableId]
  const finishFields = new Array(...finishColumn)
  finishFields.splice(destination.index, 0, startColumn[draggableId])

  const orderedFields = {
    ...fields,
    [source.droppableId]: startFields,
    [destination.droppableId]: finishFields
  }

  return dispatch({
    type: ORDER_FIELDS,
    payload: orderedFields
  })
}

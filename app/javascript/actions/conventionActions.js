import axios from 'axios'
import { SubmissionError } from 'redux-form'
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
import { errorNotify, successNotify } from '../elements/Notices'


export const fieldByColumn = data => {
  const fields = data.document_fields_attributes || data.document_fields
  const sorted = fields.reduce((accumulator, currentValue) => {
    accumulator[currentValue.column].push(currentValue)
    return accumulator
  }, { 1: [], 2: [] })

  sorted[1].sort((a, b) => a.row - b.row)
  sorted[2].sort((a, b) => a.row - b.row)
  const newData = {
    ...data,
    grouped_fields: {
      ...sorted
    }
  }
  return newData
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
  const headers = { headers: { Authorization: token } }
  const docFields = []
  const errors = {}
  Object.keys(current.grouped_fields).forEach(k => {
    current.grouped_fields[k].forEach((row, i) => {
      if (row.kind === 'select_field' && row.document_field_values.length < 1) {
        errors[`${k}${i}`] = {
          field: row.title,
          error: 'Please add values'
        }
      }

      const newRow = {
        ...row,
        document_field_values_attributes: row.document_field_values,
        column: k,
        row: i + 1
      }
      delete newRow.document_field_values
      docFields.push(newRow)
    })
  })

  if (Object.entries(errors).length > 0) {
    errorNotify('Something went wrong')
    throw new SubmissionError(errors)
  }

  const request = {
    convention: {
      document_fields_attributes: docFields
    }
  }

  return (
    axios.put(`/api/v1/projects/${projectId}/conventions/`, request, headers)
      .then(response => {
        const { data } = response
        const sortedData = fieldByColumn(data)
        successNotify('The convention was updated!')
        dispatch(conventionUpdated(sortedData))
      })
      .catch(errors => {
        errorNotify('Something went wrong')
        throw new SubmissionError(errors)
      })
  )
}

export const startEditConvention = () => (dispatch, getState) => {
  const { user: { token }, projects: { current } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${current.id}/conventions/edit`, headers)
      .then(response => {
        console.log(response)
        const { data } = response
        const sortedData = fieldByColumn(data)
        dispatch(editingConvention(sortedData))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const removeField = (column, row) => (dispatch, getState) => {
  const groupedFields = getState().conventions.current.grouped_fields
  const newColumn = new Array(...groupedFields[column])
  newColumn.splice(row, 1)

  const newFields = {
    ...groupedFields,
    [column]: newColumn
  }

  return dispatch({
    type: REMOVE_FIELD,
    payload: newFields
  })
}

export const updateFields = (field, edit = false) => (dispatch, getState) => {
  const groupedFields = getState().conventions.current.grouped_fields
  const { column, row } = field
  const newColumn = new Array(...groupedFields[column])

  if (edit) {
    newColumn.splice(row, 1, field)
  } else {
    newColumn.splice(row, 0, field)
  }

  const newFields = {
    ...groupedFields,
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

    dispatch({
      type: ORDER_FIELDS,
      payload: orderedFields
    })
    return
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

  dispatch({
    type: ORDER_FIELDS,
    payload: orderedFields
  })
}

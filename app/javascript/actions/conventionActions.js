import axios from 'axios'
import {
  EDITING_CONVENTION,
  NEW_FIELD,
  ORDER_FILEDS
} from './types'
import { errorNotify } from '../elements/Notices'

const editingConvention = payload => ({
  type: EDITING_CONVENTION,
  payload
})

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
        dispatch(editingConvention(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const startCreateField = field => (dispatch, getState) => {
  const { conventions: { current: { grouped_fields } } } = getState()
  grouped_fields[field.column].splice(field.row, 0, field)

  return dispatch({
    type: NEW_FIELD,
    payload: grouped_fields
  })
}

export const reorderFields = (result, fields) => (dispatch, getState) => {
  const { destination, source } = result
  let { draggableId } = result
  draggableId = draggableId.replace(/column_(.)_/g, '')

  if (!destination) {
    return
  }

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
      type: ORDER_FILEDS,
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
    type: ORDER_FILEDS,
    payload: orderedFields
  })
}

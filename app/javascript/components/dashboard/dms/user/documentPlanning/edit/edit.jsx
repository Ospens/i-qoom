import React, { useEffect, useState, useCallback } from 'react'
import { initialize } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DMSLayout from '../../../DMSLayout'
import DocumentsTable from './DocumentsTable'
// import Content from '../Content'
// import toggleArray from '../../../../../elements/toggleArray'
import { editPlannedListDocuments } from '../../../../../../actions/plannedListActions'

function Header({ title }) {
  return (
    <div className="dms-header">
      <ul className="buttons-with-icons-list">
        <li>
          <h4>{title}</h4>
          <label>(Selected planned list)</label>
        </li>
        <li className="ml-4">
          <button type="button" className="button-with-icon">
            <span className="icon-add_1 mr-2" />
            <span data-title="Add planned document(s)">
              <span>Add planned document(s)</span>
            </span>
          </button>
        </li>
        <li className="ml-4">
          <button type="button" className="button-with-icon">
            <span className="icon-add_1 mr-2" />
            <span data-title="Create new planned list">
              <span>Create new planned list</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  )
}

function DocumentPlanning() {
  const { projectId, listId } = useParams()
  const dispatch = useDispatch()
  const editData = useSelector(state => state.plannedLists.edit)
  useEffect(() => {
    dispatch(editPlannedListDocuments(projectId, listId))
  }, [dispatch, projectId, listId])
  useEffect(() => {
    if (!(editData.document_mains && editData.new)) return
    const { document_mains: documentMains } = editData
    documentMains.push(editData.new)
    dispatch(initialize('dms_planned_list', { document_mains: documentMains }))
  }, [dispatch, editData])

  const sidebar = <div>1</div>
  const header = <Header title='{plannedList.name}' />
  const content = <DocumentsTable />
  return (
    <DMSLayout
      header={header}
      sidebar={sidebar}
      content={content}
      classNames="with-header"
    />
  )
}

export default DocumentPlanning

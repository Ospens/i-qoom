import React, { useEffect, useState, useCallback } from 'react'
import { initialize } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DMSLayout from '../../../DMSLayout'
import DocumentsTable from './DocumentsTable'
import { editPlannedListDocuments } from '../../../../../../actions/plannedListActions'
import toggleArray from '../../../../../../elements/toggleArray'

function Header({ title }) {
  return (
    <div className="dms-header">
      <ul className="buttons-with-icons-list">
        <li>
          <h4>{title}</h4>
          <label>(Selected planned list)</label>
        </li>
      </ul>
    </div>
  )
}

function DocumentPlanning() {
  const { projectId, listId } = useParams()
  const [checkedDocs, setCheckedDoc] = useState([])
  const dispatch = useDispatch()
  const editData = useSelector(state => state.plannedLists.edit)

  useEffect(() => {
    dispatch(editPlannedListDocuments(projectId, listId))
  }, [dispatch, projectId, listId])

  useEffect(() => {
    if (!(editData.document_mains && editData.new)) return
    const { document_mains: documentMains } = editData
    documentMains.push({ document: editData.new })
    dispatch(initialize('dms_planned_list', { document_mains: documentMains }))
  }, [dispatch, editData])

  const toggleChecked = useCallback(value => {
    setCheckedDoc(toggleArray(checkedDocs, value))
  }, [checkedDocs])
  const sidebar = <div />
  const header = <Header title={editData.name} />
  const content = <DocumentsTable toggleChecked={toggleChecked} checkedDocs={checkedDocs} />
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

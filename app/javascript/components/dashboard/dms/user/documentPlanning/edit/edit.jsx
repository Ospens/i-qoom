import React, { useEffect, useState, useCallback } from 'react'
import { initialize } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DMSLayout from '../../../DMSLayout'
import DocumentsTable from './DocumentsTable'
import { editPlannedListDocuments } from '../../../../../../actions/plannedListActions'
import toggleArray from '../../../../../../elements/toggleArray'
import generateId from '../../../../../../elements/generateId'

function header(title) {
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
    if (editData.document_mains.length < 1) {
      documentMains.push({
        document: editData.new,
        temp_id: generateId()
      })
    }
    dispatch(initialize('dms_planned_list', { document_mains: documentMains }))
  }, [dispatch, editData])

  const toggleChecked = useCallback(value => {
    setCheckedDoc(toggleArray(checkedDocs, value))
  }, [checkedDocs])
  const content = <DocumentsTable toggleChecked={toggleChecked} checkedDocs={checkedDocs} />
  return (
    <DMSLayout
      header={header(editData.name)}
      content={content}
      classNames="with-header"
    />
  )
}

export default DocumentPlanning

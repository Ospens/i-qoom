import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DMSLayout from '../../DMSLayout'
import SideBar from './SideBar'
import Content from './Content'
import toggleArray from '../../../../../elements/toggleArray'
import { fetchPlannedList } from '../../../../../actions/plannedListActions'
import PlannedListModal from './plannedListForm/PlannedListModal'

function Header({ title }) {
  const [openModal, setOpenModal] = useState(false)
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
          <PlannedListModal open={openModal} setOpen={setOpenModal} />
          <button type="button" className="button-with-icon" onClick={() => setOpenModal(true)}>
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
  const [checkedDocs, setCheckedDocs] = useState([])
  const { projectId, listId } = useParams()
  const dispatch = useDispatch()
  const documents = useSelector(state => state.documents.allDocuments)
  const plannedList = useSelector(state => state.plannedLists.current)
  useEffect(() => {
    dispatch(fetchPlannedList(projectId, listId))
  }, [dispatch, projectId, listId])

  const toggleDocs = useCallback((checked, value) => {
    setCheckedDocs(toggleArray(checked, value))
  }, [])
  const sidebar = <SideBar checkedDocs={checkedDocs} />
  const header = <Header title={plannedList.name} />
  const content = (
    <Content
      checkedDocs={checkedDocs}
      toggleDocs={toggleDocs}
      documents={documents}
    />
  )
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

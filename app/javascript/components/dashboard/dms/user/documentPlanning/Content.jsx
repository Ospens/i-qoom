import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Tabs from '../../../../../elements/Tabs'
import PlanningTable from './PlanningTable'
import { fetchPlannedDocuments } from '../../../../../actions/plannedListActions'

const toBeUploadedLabel = (
  <div>
    <span className="yellow-dot mr-3" />
    <span>To be uploaded</span>
  </div>
)

const uploadedLabel = (
  <div>
    <i className="icon-check_3 mr-3" />
    <span>Uploaded documents</span>
  </div>
)

function Content({ checkedDocs, toggleDocs, documents }) {
  const dispatch = useDispatch()
  const { projectId } = useParams()
  useEffect(() => {
    dispatch(fetchPlannedDocuments(projectId))
  }, [dispatch, projectId])
  return (
    <div className="dms-content">
      <Tabs className="top-block" scrollable>
        <div label={toBeUploadedLabel}>
          <PlanningTable
            checkedDocs={checkedDocs}
            toggleDocs={toggleDocs}
            documents={documents}
            type="notUploaded"
          />
        </div>
        <div label={uploadedLabel}>
          <PlanningTable
            checkedDocs={checkedDocs}
            toggleDocs={toggleDocs}
            documents={documents}
            type="uploaded"
          />
        </div>
      </Tabs>
    </div>
  )
}

export default Content

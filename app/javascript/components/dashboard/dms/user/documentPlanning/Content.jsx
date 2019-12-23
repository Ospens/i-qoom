import React, { useState } from 'react'
import Tabs from '../../../../../elements/Tabs'
import PlanningTable from './PlanningTable'
import PlannedListModal from './plannedListForm/PlannedListModal'

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

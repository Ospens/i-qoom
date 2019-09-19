import React from 'react'
import Tabs from '../../../../../elements/Tabs'
import PlanningTable from './PlanningTable'

function Content({ checkedDocs, toggleDocs, documents }) {
  return (
    <div className='dms-content'>
      <Tabs>
        <div label={<div><span className='yellow-dot mr-3' />To be uploaded</div>} key='notUploaded'>
          <PlanningTable checkedDocs={checkedDocs} toggleDocs={toggleDocs} documents={documents} type='notUploaded' />
        </div>
        <div label={<div><i className='svg-icon green-check-icon mr-3' />Uploaded documents</div>} key='uploaded'>
          <PlanningTable checkedDocs={checkedDocs} toggleDocs={toggleDocs} documents={documents} type='uploaded' />
        </div>
      </Tabs>
    </div>
  )
}

export default Content

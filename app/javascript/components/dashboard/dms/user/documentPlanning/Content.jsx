import React from 'react'
import Tabs from '../../../../../elements/Tabs'
import PlanningTable from './PlanningTable'

function Content({ checkedDocs, toggleDocs, documents }) {
  return (
    <div className='dms-content'>
      <Tabs className='top-block' scrollable>
        <div label={<div><span className='yellow-dot mr-3' />To be uploaded</div>} key='notUploaded'>
          <PlanningTable checkedDocs={checkedDocs} toggleDocs={toggleDocs} documents={documents} type='notUploaded' />
        </div>
        <div label={<div><i className='icon-check_3 mr-3' />Uploaded documents</div>} key='uploaded'>
          <PlanningTable checkedDocs={checkedDocs} toggleDocs={toggleDocs} documents={documents} type='uploaded' />
        </div>
      </Tabs>
    </div>
  )
}

export default Content

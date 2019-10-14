import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CodeStructure from '../../master/codifications/CodeStructure'
import CodificationTable from '../../master/codifications/CodificationTable'
import { startEditConvention } from '../../../../../actions/conventionActions'

function Codification({ match: { params: { project_id } } }) {
  const dispatch = useDispatch()
  useEffect(() => { dispatch(startEditConvention(project_id)) }, [])

  return (
    <div>
      <div className='my-4 d-flex'>
        <h6 className='m-0'>Codification</h6>
        <button className='with-icon ml-auto' type='button'>
          <span>Download list as PDF</span>
        </button>
      </div>
      <div className='mb-4'>
        <span className='column-title'>The following file code structure is to use</span>
      </div>
      <CodeStructure disabled={true} />
      <CodificationTable viewOnly={true}/>
    </div>
  )
}

export default withRouter(Codification)

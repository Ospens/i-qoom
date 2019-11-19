import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CompanyBlock from './CompanyBlock'
import AdminBlock from './AdminBlock'
import NewAdmin from './NewAdmin'
import { starUpdateAdmin } from '../../../../actions/projectActions'

function ProjectDetails({ match: { params: { project_id } } }) {
  const admins = useSelector(state => state.projects.current.admins)
  const companyData = useSelector(state => state.projects.current.company_data)
  const id = useSelector(state => state.projects.current.id)
  const dispatch = useDispatch()

  const updateAdmin = useCallback(values =>
    dispatch(starUpdateAdmin(project_id, values))
  [dispatch])

  return (
    <div>
      <h5 className='tab-title'>Project details</h5>
      <div className='row'>
        <CompanyBlock initialValues={{ company_data: companyData, id }}/>
        <div className='col-lg-6 admins-column'>
          {admins.map((admin, i) => (
            <AdminBlock
              key={i}
              index={i + 1}
              admin={admin}
              initialValues={admin}
              form={`admin_form_${i}`}
              projectId={project_id}
              updateAdmin={updateAdmin}
            />
          ))}
          <NewAdmin
            index={admins.length + 1}
            form={`admin_form_${admins.length + 1}`}
            updateAdmin={updateAdmin}
            projectId={project_id}
          />
        </div>
      </div>
    </div>
  )
}

export default withRouter(ProjectDetails)

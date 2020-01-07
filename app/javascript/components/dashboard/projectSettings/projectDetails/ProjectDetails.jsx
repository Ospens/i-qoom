import React from 'react'
import { useSelector } from 'react-redux'
import CompanyBlock from './CompanyBlock'

function ProjectDetails() {
  // const admins = useSelector(state => state.projects.current.admins)
  const companyData = useSelector(state => state.projects.edit.company_data)
  const id = useSelector(state => state.projects.edit.id)
  // const dispatch = useDispatch()

  // const updateAdmin = useCallback(values => dispatch(starUpdateAdmin(projectId, values))
  //  [dispatch])

  return (
    <div>
      <h5 className="tab-title">Project details</h5>
      <div className="row">
        <CompanyBlock initialValues={{ company_data: companyData, id }} />
        {/* <div className='col-lg-6 admins-column'>
          {admins.map((admin, i) => (
            <AdminBlock
              key={i}
              index={i + 1}
              admin={admin}
              initialValues={admin}
              form={`admin_form_${i}`}
              projectId={projectId}
              updateAdmin={updateAdmin}
            />
          ))}
          <NewAdmin
            index={admins.length + 1}
            form={`admin_form_${admins.length + 1}`}
            updateAdmin={updateAdmin}
            projectId={projectId}
          />
        </div> */}
      </div>
    </div>
  )
}

export default ProjectDetails

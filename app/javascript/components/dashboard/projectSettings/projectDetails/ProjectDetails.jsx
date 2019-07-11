import React, { Component } from 'react'
import { connect } from 'react-redux'
import CompanyBlock from './CompanyBlock'
import AdminBlock from './AdminBlock'

class ProjectDetails extends Component {

  render() {
    const { admins, id } = this.props

    return (
      <div>
        <h5 className='tab-title'>Project details</h5>
        <div className='row'>
          <CompanyBlock />
          <AdminBlock
            index={1}
            admin={admins[0]}
            formName='first_admin_form'
            projectId={id}
            />
          <AdminBlock
            index={2}
            admin={admins[1]}
            formName='second_admin_form'
            projectId={id}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ projects }) => ({
  admins: projects.current.admins
})

export default connect(mapStateToProps)(ProjectDetails)

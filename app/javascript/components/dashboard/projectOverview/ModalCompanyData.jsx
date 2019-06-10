import React, { Component } from 'react'
import { connect } from 'react-redux'
import CompanyForm from '../../../elements/forms/CompanyForm'
import { startUpdateProject } from '../../../actions/projectActions'

class ModalCompanyData extends Component {

  handleSubmit = values => {
    const { changeStep, updateProject, project } = this.props
    // TODO: update this method
    const step = values.same_for_billing_address ? 2 : 1

    if (step === 2) {
      return updateProject(values, project.id, 'company_datum')
        .then(() => changeStep(step))
    } else {
      changeStep(step)
    }
  }

  render() {
    const { modalTitle } = this.props 
    return (
      <div className='new-project-modal'>
        <h4>{modalTitle || 'New project'}</h4>
        <CompanyForm
          {...this.props}
          mainClassName='modal-body company-data'
          customSubmit={(values) => this.handleSubmit(values)}
          headerForm='Please enter company data'
          creating={true}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  project: state.projects.project
})

const mapDispatchToProps = dispatch => ({
  updateProject: (values, id, step) => dispatch(startUpdateProject(values, id, step))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalCompanyData)

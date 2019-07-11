import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, FormSection, resetSection, getFormSubmitErrors } from 'redux-form'
import CompanyFields from '../../../../elements/forms/CompanyFields'
import NewModal from '../../../../elements/Modal'
import ModalBillingAddress from '../../projectOverview/ModalBillingAddress'
import { startUpdateProject, startFetchProject } from '../../../../actions/projectActions'
import { successNotify } from '../../../../elements/Notices'

export class CompanyBlock extends Component {
  nodeRef = React.createRef()

  state = {
    billingForm: false
  }

  toggleModals = (key, val) => {
    this.setState({ [key]: val })
  }

  handleSubmit = values => {
    const { updateProject } = this.props
    return updateProject(values)
      .then(() => successNotify('The changes were successfully saved!'))
  }

  modalButtons = () => {
    const { resetSection } = this.props
    return (
      <div className='modal-footer'>
        <button
          type='button'
          className='btn btn-white-blue clear-form'
          onClick={resetSection}
        >
          Clear form
        </button>
        <button
          type='button'
          className='btn btn-white'
          onClick={() => this.toggleModals('billingForm', false)}
        >
          Cancel
        </button>
        <button type='submit' className='btn btn-purple'>Save</button>
      </div>
    )
  }

  renderCompanyDataButtons = () => {
    const { pristine } = this.props

    return (
      <div>
        {!pristine &&
        <button
          type='submit'
          className='btn btn-purple wide-button mb-2'
        >
          Save changes
        </button>}
        <button
          type='button'
          className='btn btn-white-blue wide-button mt-2'
          onClick={() => this.toggleModals('billingForm', true)}
        >
          Billing address
        </button>
      </div>
    )
  }

  renderBillingModal = () => {
    return (
      <FormSection name='company_data'>
        <ModalBillingAddress
          submitButtons={this.modalButtons}
          modalTitle='Billing address'
        />
      </FormSection>
    )
  }

  render() {
    const { submitErrors } = this.props
    const { billingForm } = this.state

    return (
      <form
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
        className='col-lg-4'
        ref={this.nodeRef}
      >
        <FormSection name='company_data'>
          <span className='block-title'>Company data</span>
          <CompanyFields submitErrors={submitErrors} />
          {this.renderCompanyDataButtons()}
        </FormSection>
        <NewModal
          content={this.renderBillingModal()}
          open={billingForm}
          mountNode={this.nodeRef.current}
          onClose={() => this.toggleModals('billingForm', false)}
        />
      </form>
    )
  }
}

const mapStateToProps = state => {
  const { company_data, id } = state.projects.current
  return ({
    initialValues: { id, company_data },
    submitErrors: getFormSubmitErrors('company_form')(state)
  })
}
const mapDispatchToProps = dispatch => ({
  resetSection: () => dispatch(resetSection('company_form', 'company_data.billing_address')),
  updateProject: (values) => dispatch(startUpdateProject(values)),
  startFetchProject: id => dispatch(startFetchProject(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'company_form',
  enableReinitialize: true
})(CompanyBlock))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, FormSection, resetSection } from 'redux-form'
import CompanyFields from '../../../../elements/forms/CompanyFields'
import NewModal from '../../../../elements/Modal'
import BillingAddress from '../../projectOverview/BillingAddress'
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
      .then(() => {
        successNotify('The changes were successfully saved!')
        this.toggleModals('billingForm', false)
      })
  }

  modalButtons = () => {
    const { resetSection } = this.props
    return (
      <div className='new-modal__footer'>
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
          className='btn btn-purple full-widemb-2'
        >
          Save changes
        </button>}
        <button
          type='button'
          className='btn btn-white-blue full-widemt-2'
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
        <div className='new-modal'>
          <div className='new-modal__header'><h4>Billing address</h4></div>
          <BillingAddress submitButtons={this.modalButtons} />
        </div>
      </FormSection>
    )
  }

  render() {
    const { billingForm } = this.state

    return (
      <form
        noValidate={true} 
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
        className='col-lg-6 company-data-form'
        ref={this.nodeRef}
      >
        <FormSection name='company_data'>
          <div className='block-title'>
            <span>Company data</span>
          </div>
          <CompanyFields />
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

const mapStateToProps = ({ projects: { current: { id, company_data } }}) => ({
  initialValues: { id, company_data }
})

const mapDispatchToProps = dispatch => ({
  resetSection: () => dispatch(resetSection('company_form', 'company_data.billing_address')),
  updateProject: (values) => dispatch(startUpdateProject(values)),
  startFetchProject: id => dispatch(startFetchProject(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'company_form',
  enableReinitialize: true
})(CompanyBlock))

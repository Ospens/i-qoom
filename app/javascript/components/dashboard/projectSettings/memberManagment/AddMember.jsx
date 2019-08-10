import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getFormSubmitErrors,
  reduxForm,
  FormSection,
  Field
} from 'redux-form'
import AddressFields from '../../../../elements/forms/AddressFields'
import InputField from '../../../../elements/InputField'
import SelectField from '../../../../elements/SelectField'
import {
  startCreatingProjectMember,
  startCreateProjectMember
} from '../../../../actions/projectMembersActions'

const options = [
  { value: 1, title: 'Employee' },
  { value: 2, title: 'Internal contractor' },
  { value: 3, title: 'External contractor' }
]

class AddMember extends Component {
  state = {
    step: 1
  }

  componentWillMount() {
    const { startCreatingProjectMember, projectId } = this.props
    startCreatingProjectMember(projectId)
  }

  handleSubmit = values => {
    const { startCreateProjectMember, projectId } = this.props
    return startCreateProjectMember(values, projectId).then(this.closeModal)
  }
  
  changeStep = (val) => {
    this.setState({ step: val })
  }

  closeModal = () => {
    const { closeModal } = this.props
    this.changeStep(1)
    closeModal()
  }

  renderButtons = () => {
    let { step } = this.state
    return (
      <div className='modal-footer'>
        {step > 1 &&
        <button
          type='button'
          className='btn btn-back back-member-details'
          onClick={() => this.changeStep(step - 1)}
        >
          <i className="svg-icon arrow-left-icon" />
          Back
        </button>}
        <button
          type='button'
          className='btn btn-white'
          onClick={this.closeModal}
        >
          Cancel
        </button>
        {step < 4
          ? <button
            type='button'
            className='btn btn-purple'
            onClick={() => this.changeStep(step + 1)}
            // disabled={pristine}
          >
            Next
          </button>
          : <React.Fragment>
              <button type='submit' className='btn btn-purple'>Save</button>
              <button type='submit' className='btn btn-purple'>Invite</button>
            </React.Fragment>
        }

      </div>
    )
  }

  renderTypeEmployment = () => {
    const { submitErrors } = this.props
    return (
      <React.Fragment>
        <h6>Please select type of employment</h6>
        <div className='form-group'>
          <Field
            name='employment_type'
            id='employment_type'
            options={options}
            errorField={submitErrors}
            component={SelectField}
          />
        </div>
      </React.Fragment>
    )
  }

  renderCompanyEmplyee = () => {
    const { submitErrors } = this.props
    return (
      <React.Fragment>
        <h6>From which company is the employee?</h6>
        <div className='form-group'>
          <Field
            name='company_type'
            id='company_type'
            options={options}
            errorField={submitErrors}
            component={SelectField}
          />
        </div>
      </React.Fragment>
    )
  }

  renderMemberDetails = () => {
    const { submitErrors } = this.props
    return (
      <React.Fragment>
        <h6>Please enter member details</h6>
        <div className='form-group'>
          <label htmlFor='first_name'>Member details</label>
          <Field
            component={InputField}
            name='first_name'
            id='first_name'
            errorField={submitErrors}
            placeholder='First Name'
          />
        </div>
        <div className='form-group'>
          <Field
            component={InputField}
            name='last_name'
            id='last_name'
            errorField={submitErrors}
            placeholder='Last name'
          />
        </div>
        <div className='form-group'>
          <Field
            component={InputField}
            name='email'
            id='email'
            errorField={submitErrors}
            placeholder='Email address'
          />
        </div>
        <div className='row'>
          <div className='form-group col-4'>
            <Field
              component={InputField}
              name='phone_code'
              id='phone_code'
              errorField={submitErrors}
              placeholder='+00'
            />
          </div>
          <div className='form-group col-8'>
            <Field
              component={InputField}
              name='phone_number'
              id='phone_number'
              errorField={submitErrors}
              placeholder='Phone number'
            />
          </div>
        </div>
      </React.Fragment>
    )
  }

  renderCompanyData = () => {
    const { submitErrors } = this.props
    return (
      <React.Fragment>
        <h6>Please enter company data</h6>
        <FormSection name='company_address'>
          <AddressFields submitErrors={submitErrors}/>
        </FormSection>
      </React.Fragment>
    )
  }

  render() { 
    const { step } = this.state
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>

        <div className='new-project-modal'>
          <h4>New member</h4>
          <div className='modal-body project-name'>
            {(() => {
              switch (step) {
                case 1:
                  return this.renderTypeEmployment()
                case 2:
                  return this.renderCompanyEmplyee()
                case 3:
                  return this.renderCompanyData()
                case 4:
                  return this.renderMemberDetails()
                default:
                  return this.renderTypeEmployment()
              }
            })()}
          </div>
          {this.renderButtons()}
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startCreatingProjectMember: id => dispatch(startCreatingProjectMember(id)),
  startCreateProjectMember: (values, projectId) => dispatch(startCreateProjectMember(values, projectId))
})

const mapStateToProps = state => ({
  options: state.projectMembers.members,
  submitErrors: getFormSubmitErrors('project_member_form')(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'project_member_form' })(AddMember))

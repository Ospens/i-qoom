import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
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
import { required, email } from '../../../../elements/validations'

class AddMember extends Component {
  state = {
    step: 1
  }

  componentWillMount() {
    const { startCreatingProjectMember, projectId } = this.props
    startCreatingProjectMember(projectId)
  }

  handleSubmit = values => {
    const { step } = this.state

    const { startCreateProjectMember, projectId } = this.props
    if (step < 4) {
      this.nextStep()
      return
    }

    return startCreateProjectMember(values, projectId).then(this.closeModal)
  }
  
  changeStep = (val) => {
    this.setState({ step: val })
  }
  
  nextStep = () => this.setState(prevState => ({ step: prevState.step + 1 }))

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
              type='submit'
              className='btn btn-purple'
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

  renderTypeEmployment = () => (
    <React.Fragment>
      <h6>Please select type of employment</h6>
      <div className='form-group'>
        <Field
          name='employment_type'
          id='employment_type'
          options={this.props.employment_type_options}
          component={SelectField}
          validate={[required]}
        />
      </div>
    </React.Fragment>
  )

  renderCompanyEmplyee = () => (
    <React.Fragment>
      <h6>From which company is the employee?</h6>
      <div className='form-group'>
        <Field
          name='company_type'
          id='company_type'
          options={this.props.company_type_options}
          component={SelectField}
          validate={[required]}
        />
      </div>
    </React.Fragment>
  )

  renderMemberDetails = () => (
    <div>
      <h6>Please enter member details</h6>
      <Field
        component={InputField}
        name='first_name'
        id='first_name'
        className='form-group'
        placeholder='First Name'
        validate={[required]}
        label='Member details'
      />
      <Field
        component={InputField}
        name='last_name'
        id='last_name'
        className='form-group'
        placeholder='Last name'
        validate={[required]}
      />
      <Field
        component={InputField}
        name='email'
        id='email'
        className='form-group'
        placeholder='Email address'
        validate={[required, email]}
      />
      <div className='form-row'>
        <Field
          component={InputField}
          className='form-group col-md-4'
          name='phone_code'
          id='phone_code'
          placeholder='+00'
        />
        <Field
          component={InputField}
          className='form-group col-md-8'
          name='phone_number'
          id='phone_number'
          placeholder='Phone number'
        />
      </div>
      <div className='form-row'>
        <Field
          component={InputField}
          className='form-group col-md-6'
          name='job_title'
          id='job_title'
          placeholder='Job title'
        />
        <Field
          component={SelectField}
          className='form-group col-md-6'
          name='discipline_id'
          id='discipline_id'
          options={this.props.discipline_options}
          placeholder='Discipline'
        />
      </div>
    </div>
  )

  renderCompanyData = () => (
    <div>
      <h6>Please enter company data</h6>
      <FormSection name='company_address'>
        <AddressFields />
      </FormSection>
    </div>
  )

  render() { 
    const { step } = this.state
    return (
      <form noValidate={true} onSubmit={this.props.handleSubmit(this.handleSubmit)}>

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

const mapStateToProps = ({ projectMembers: { creating, disciplines }}) => ({
  company_type_options: creating.company_types,
  employment_type_options: creating.employment_types,
  discipline_options: disciplines,
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'project_member_form' })(AddMember))

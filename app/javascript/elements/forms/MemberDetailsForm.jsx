import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import {
  getFormSubmitErrors,
  reduxForm,
  Field,
  formValueSelector
} from 'redux-form'
import InputField from '../InputField'
import SelectField from '../SelectField'
import Left from '../../images/arrow-button-left'

const options = [
  { value: 'project_company', label: 'Project company' },
  { value: 'parent_company', label: 'Parent company' },
  { value: 'joint_venture_company', label: 'Joint venture company' }
]

class MemberDetailsForm extends Component {

  handleSubmit = (values) => {
    const { customSubmit } = this.props
    if (customSubmit) {
      customSubmit(values)
    }
    console.log(values)
  }

  renderSubmitButtons = () => {
    const { closeModal, changeStep } = this.props
    return (
      <div className='modal-footer'>
        <button type='button' className='btn btn-back back-member-details' onClick={() => changeStep(2)}>
          <ReactSVG
            svgStyle={{ height: 10, width: 10, marginRight: 5 }}
            src={Left}
          />
          Back
        </button>
        <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
        <button type='submit' className='btn btn-purple' onClick={closeModal}>Save</button>
        <button type='submit' className='btn btn-purple' onClick={closeModal}>Next</button>
      </div>
    )
  }

  render() {
    const { submitErrors, mainClassName, customButtons, headerForm,  pristine } = this.props
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <div className={mainClassName}>
            <h6>{headerForm}</h6>
            <div className='form-group'>
              <label htmlFor='first_name'>Member details</label>
              <InputField
                type='text'
                name='first_name'
                id='first_name'
                errorField={submitErrors}
                placeholder='First Name'
              />
            </div>
            <div className='form-group'>
              <InputField
                type='text'
                name='surname'
                id='surname'
                errorField={submitErrors}
                placeholder='Surname'
              />
            </div>
            <div className='form-group'>
              <InputField
                type='text'
                name='email_address'
                id='email_address'
                errorField={submitErrors}
                placeholder='Email address'
              />
            </div>
            <div className='row'>
              <div className='form-group col-4'>
                <InputField
                  type='text'
                  name='phone_code'
                  id='phone_code'
                  errorField={submitErrors}
                  placeholder='+00'
                />
              </div>
              <div className='form-group col-8'>
                <InputField
                  type='text'
                  name='phone_number'
                  id='phone_number'
                  errorField={submitErrors}
                  placeholder='Phone number'
                />
              </div>
            </div>
            <div className='row form-group select-row'>
              <div className='form-group col-6'>
                <label htmlFor='employment_type'>Job title</label>
                <Field
                  name='employment_type'
                  id='employment_type'
                  options={options}
                  errorField={submitErrors}
                  component={SelectField}
                />
              </div>
              <div className='form-group col-6'>
                <label htmlFor='discipline'>Discipline</label>
                <Field
                  name='discipline'
                  id='discipline'
                  options={options}
                  errorField={submitErrors}
                  component={SelectField}
                />
              </div>
            </div>
          </div>
          {customButtons ? customButtons(pristine) : this.renderSubmitButtons()}
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  resetForm: () => dispatch(reset('member_details_form'))
})

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('member_details_form')(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'member_details_form' })(MemberDetailsForm))

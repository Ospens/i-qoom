import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFormSubmitErrors, reduxForm, formValueSelector } from 'redux-form'
import InputField from '../InputField'

class AdministratorForm extends Component {

  handleSubmit = (values) => {
    const { customSubmit } = this.props
    customSubmit()
  }

  renderSubmitButtons = () => {
    const { closeModal, username, last_name, first_name, email } = this.props
    const hasEmptyFields = !username || !last_name || !first_name || !email
    return (
      <div className='modal-footer'>
        <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
        <button
          type='submit'
          className='btn btn-purple'
          disabled={hasEmptyFields}
        >
          Next
        </button>
      </div>
    )
  }

  render() {
    const { submitErrors, customButtons, titleModal, label, mainClass, pristine, nameForm } = this.props
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <div className={mainClass}>
            <h6>{titleModal}</h6>
            {label && <label className='project-admin'>{label}</label>}
            <div className='row'>
              <div className='form-group col-3'>
                <InputField
                  type='text'
                  name='username'
                  id={`${nameForm}_username`}
                  errorField={submitErrors}
                  placeholder='Username'
                />
              </div>
              <div className='form-group col-9'>
                <InputField
                  type='text'
                  name='last_name'
                  id={`${nameForm}_last_name`}
                  errorField={submitErrors}
                  placeholder='Last name'
                />
              </div>
            </div>
            <div className='custom_row'>
              <div className='form-group'>
                <InputField
                  type='text'
                  name='first_name'
                  id={`${nameForm}_first_name`}
                  errorField={submitErrors}
                  placeholder='First name'
                />
              </div>
            </div>
            <div className='custom_row'>
              <div className='form-group'>
                <InputField
                  type='text'
                  name='email'
                  id={`${nameForm}_email`}
                  errorField={submitErrors}
                  placeholder='Email address'
                />
              </div>
            </div>
            <div className='row'>
              <div className='form-group col-3'>
                <InputField
                  type='text'
                  name='phone_code'
                  id={`${nameForm}_phone_code`}
                  errorField={submitErrors}
                  placeholder='+00'
                />
              </div>
              <div className='form-group col-9'>
                <InputField
                  type='text'
                  name='phone_number'
                  id={`${nameForm}_phone_number`}
                  errorField={submitErrors}
                  placeholder='Phone number'
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

const selector = formValueSelector('administrator_form')

const mapStateToProps = (state, ownProps) => ({
  form: ownProps.nameForm,
  submitErrors: getFormSubmitErrors('administrator_form')(state),
  username: selector(state, 'username'),
  last_name: selector(state, 'last_name'),
  first_name: selector(state, 'first_name'),
  email: selector(state, 'email')
})

export default connect(mapStateToProps)(reduxForm({destroyOnUnmount: false})(AdministratorForm))

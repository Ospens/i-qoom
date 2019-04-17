import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFormSubmitErrors, reduxForm, formValueSelector } from 'redux-form'
import InputField from '../InputField'

class AdministratorForm extends Component {

  handleSubmit = (values) => {
    const { changeStep } = this.props
    changeStep(1)
  }

  renderSubmitButtons = () => {
    const { closeModal, title, surname, first_name, email } = this.props
    const hasEmptyFields = !title || !surname || !first_name || !email
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
    const { submitErrors, customButtons, titleModal, label, mainClass } = this.props
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
                  name='title'
                  id='title'
                  errorField={submitErrors}
                  placeholder='Title'
                />
              </div>
              <div className='form-group col-9'>
                <InputField
                  type='text'
                  name='surname'
                  id='surname'
                  errorField={submitErrors}
                  placeholder='Surname'
                />
              </div>
            </div>
            <div className='custom_row'>
              <div className='form-group'>
                <InputField
                  type='text'
                  name='first_name'
                  id='first_name'
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
                  id='email'
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
                  id='phone_code'
                  errorField={submitErrors}
                  placeholder='+00'
                />
              </div>
              <div className='form-group col-9'>
                <InputField
                  type='text'
                  name='phone_number'
                  id='phone_number'
                  errorField={submitErrors}
                  placeholder='Phone number'
                />
              </div>
            </div>
          </div>
          {customButtons ? customButtons() : this.renderSubmitButtons()}
        </form>
      </div>
    )
  }
}

const selector = formValueSelector('create_administrator')

const mapStateToProps = (state, ownProps) => ({
  form: ownProps.nameForm,
  submitErrors: getFormSubmitErrors('create_administrator')(state),
  title: selector(state, 'title'),
  surname: selector(state, 'surname'),
  first_name: selector(state, 'first_name'),
  email: selector(state, 'email')
})

export default connect(mapStateToProps)(reduxForm({destroyOnUnmount: false})(AdministratorForm))

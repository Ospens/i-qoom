import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFormSubmitErrors, reduxForm, formValueSelector } from 'redux-form'
import InputField from '../InputField'

class AdministratorForm extends Component {

  handleSubmit = (values) => {
    const { customSubmit } = this.props

    const newValues = {}
    Object.keys(values).forEach(k => {
      const key = k.replace(/administrator_form_(.)_/g, '')
      newValues[key] = values[k]
    })
    return customSubmit(newValues)
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
    const { submitErrors, customButtons, titleModal, label, mainClass, pristine, form } = this.props

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <div className={mainClass}>
            <h6>{titleModal}</h6>
            {label && <label className='project-admin'>{label}</label>}
            <div className='row'>
              <div className='form-group col-3'>
                <Field
                  component={InputField}
                  name={`username`}
                  id={`username`}
                  errorField={submitErrors}
                  placeholder='Username'
                />
              </div>
              <div className='form-group col-9'>
                <Field
                  component={InputField}
                  name={`last_name`}
                  id={`last_name`}
                  errorField={submitErrors}
                  placeholder='Last name'
                />
              </div>
            </div>
            <div className='custom_row'>
              <div className='form-group'>
                <Field
                  component={InputField}
                  name={`first_name`}
                  id={`first_name`}
                  errorField={submitErrors}
                  placeholder='First name'
                />
              </div>
            </div>
            <div className='custom_row'>
              <div className='form-group'>
                <Field
                  component={InputField}
                  name={`email`}
                  id={`email`}
                  errorField={submitErrors}
                  placeholder='Email address'
                />
              </div>
            </div>
            <div className='row'>
              <div className='form-group col-3'>
                <Field
                  component={InputField}
                  name={`phone_code`}
                  id={`phone_code`}
                  errorField={submitErrors}
                  placeholder='+00'
                />
              </div>
              <div className='form-group col-9'>
                <Field
                  component={InputField}
                  name={`phone_number`}
                  id={`phone_number`}
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

const mapStateToProps = (state, ownProps) => {
  const selector = formValueSelector(ownProps.form)

  return ({
    submitErrors: getFormSubmitErrors(ownProps.form)(state),
    username: selector(state, `username`),
    last_name: selector(state, `last_name`),
    first_name: selector(state, `first_name`),
    email: selector(state, `email`),
    destroyOnUnmount: ownProps.form !== 'administrator_form'
  })
}

export default connect(mapStateToProps)
                (reduxForm({
                  // destroyOnUnmount: false,
                  enableReinitialize: true
                })
                (AdministratorForm))

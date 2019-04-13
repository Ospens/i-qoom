import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFormSubmitErrors, reduxForm } from 'redux-form'
import InputField from '../../../elements/InputField'

class CreateProjectStepSecond extends Component {

  handleSubmit = () => {
    const { login, password } = this.state
    const { signInUser, history, toggleSignInForm } = this.props
    return signInUser(login, password, history).then(() => toggleSignInForm())
  }

  render() {
    const { submitErrors, closeModal, changeStep } = this.props
    return (
      <div>
        <div className='modal-body'>
          <h6>Who is the project administrator?</h6>
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <label className='project-admin'>Project administrator</label>
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
            <div className='form-group'>
              <InputField
                type='text'
                name='first_name'
                id='first_name'
                errorField={submitErrors}
                placeholder='First name'
              />
            </div>
            <div className='form-group'>
              <InputField
                type='text'
                name='email'
                id='email'
                errorField={submitErrors}
                placeholder='Email address'
              />
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
          </form>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
          <button type='button' className='btn btn-purple' onClick={() => changeStep(1)}>Next</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  //signInUser: (login, password, history) => dispatch(signInUser(login, password, history))
})

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('create_administrator')(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'create_administrator' })(CreateProjectStepSecond))

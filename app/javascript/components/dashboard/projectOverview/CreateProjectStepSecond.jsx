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
    const { submitErrors } = this.props
    return (
      <div>
        <h2>New project</h2>
        <div className='modal-body'>
          <h6>Who is the project administrator?</h6>
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
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
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  //signInUser: (login, password, history) => dispatch(signInUser(login, password, history))
})

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('sign_in')(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'create_administrator' })(CreateProjectStepSecond))

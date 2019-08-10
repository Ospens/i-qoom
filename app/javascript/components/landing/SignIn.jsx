import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { signInUser } from '../../actions/userActions'
import InputField from '../../elements/InputField'
import { required } from '../../elements/validations'

class SignIn extends Component {
  state = {
    loginSuccess: false
  }

  handleSubmit = values => {
    const { signInUser } = this.props
    return signInUser(values).then(() => this.setState({ loginSuccess: true }))
  }

  render() {
    const { loginSuccess } = this.state

    const openClass = '' //`${showSignInSlider ? 'show-slider' : ''}`

    if (loginSuccess) {
      return <Redirect to='/menu' />
    }

    return (
      <section id='first-card'>
        <div className='container'>
          <div className='welcome-and-signin justify-content-center'>
              <div className={`sign-in-form ${openClass}`}>
                <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                  <h2 className='sign-in-form__header text-center'>Log into your accont</h2>
                  <div className='form-group'>
                    <Field
                      component={InputField}
                      name='login'
                      id='login'
                      label='Type in e-mail adress or I-qoom ID'
                      placeholder='Company name'
                      validate={[required]}
                    />
                  </div>
                  <div className='form-group pt-4'>
                    <Field
                      component={InputField}
                      type='password'
                      name='password'
                      id='password'
                      label='Type in password'
                      placeholder='Password'
                      validate={[required]}
                    />
                  </div>
                  <div className='btn-toolbar pt-4'>
                    <div className='btn-group justify-content-center'>
                      <Link className='col-6 btn btn-back mx-auto' to='/'>
                        <i className='svg-icon arrow-left-icon' />
                        Back
                      </Link>
                    </div>
                    <div className='btn-group justify-content-center'>
                      <button type='submit' className='col-12 btn btn-primary'>Login</button>
                    </div>
                  </div>
                </form>
              </div>
          </div>
        </div>
      </section>
      
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signInUser: values => dispatch(signInUser(values))
})

export default connect(null, mapDispatchToProps)(reduxForm({ form: 'sign_in' })(SignIn))

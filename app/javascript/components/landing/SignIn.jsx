import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { signInUser } from '../../actions/userActions'
import Left from '../../images/arrow-button-left'

class SignIn extends Component {
  state = {
    login: null,
    password: null
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { login, password } = this.state
    const { signInUser, history } = this.props

    signInUser(login, password, history)
  }

  render() {
    const { showSignInSlider, toggleSignInForm } = this.props

    const openClass = `${showSignInSlider ? 'show-slider' : ''}`
    
    return (
      <div className={`sign-in-form ${openClass}`}>
        <form onSubmit={this.handleSubmit}>
          <h2 className='sign-in-form__header text-center'>Log into yout accont</h2>
          <div className='form-group'>
            <label htmlFor='login'>Type in e-mail adress or I-qoom ID</label>
            <Field
              type='text'
              name='login'
              component='input'
              id='login'
              onChange={this.handleChange}
              className='form-control'
              placeholder='Company name'
            />
          </div>
          <div className='form-group pt-4'>
            <label htmlFor='password'>Type in password</label>
            <Field
              type='password'
              name='password'
              component='input'
              id='password'
              onChange={this.handleChange}
              className='form-control'
              placeholder='Password'
            />
          </div>
          <div className='btn-toolbar pt-4'>
            <div className='btn-group justify-content-center'>
              <button type='button' className='col-6 btn btn-back' onClick={toggleSignInForm}>
                <ReactSVG
                  svgStyle={{ height: 15, width: 15, marginRight: 10 }}
                  src={Left}
                />
                Back
              </button>
            </div>
            <div className='btn-group justify-content-center'>
              <button type='submit' className='col-12 btn btn-primary'>Login</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signInUser: (login, password, history) => dispatch(signInUser(login, password, history))
})

export default connect(null, mapDispatchToProps)(reduxForm({ form: 'sign_in' })(SignIn))

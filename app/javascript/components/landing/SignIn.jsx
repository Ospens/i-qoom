import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signInUser } from '../../actions/userActions'
import { withRouter } from 'react-router-dom';

const defaultState = {
  login: null,
  password: null
}

class SignIn extends Component {
  state = defaultState

  handleChange = (e) => {
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
    const { login, password } = this.state
    const { showSignInSlider, toggleSignInForm } = this.props

    const openClass = `${showSignInSlider ? 'show-slider' : ''}`
    
    return (
      <div className={`sign-in-form ${openClass}`}>
        <form onSubmit={this.handleSubmit}>
          <h2 className='sign-in-form__header text-center'>Log into yout accont</h2>
          <div className='form-group'>
            <label htmlFor='login'>Type in e-mail adress or I-qoom ID</label>
            <input
              type='login'
              id='login'
              onChange={this.handleChange}
              defaultValue={login}
              className='form-control'
              aria-describedby='loginHelp'
              placeholder='Company name'
            />
          </div>
          <div className='form-group pt-4'>
            <label htmlFor='password'>Type in password</label>
            <input
              type='password'
              id='password'
              onChange={this.handleChange}
              defaultValue={password}
              className='form-control'
              placeholder='Password'
            />
          </div>
          <div className='btn-toolbar pt-4'>
            <div className='btn-group justify-content-center'>
              <button type='button' className='col-6 btn btn btn-transparent' onClick={toggleSignInForm}>Back</button>
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

export default connect(null, mapDispatchToProps)(withRouter(SignIn))

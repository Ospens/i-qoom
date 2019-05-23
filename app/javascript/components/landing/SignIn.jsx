import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getFormSubmitErrors, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import { signInUser } from '../../actions/userActions'
import InputField from '../../elements/InputField'
import Left from '../../images/arrow-button-left'

class SignIn extends Component {
  state = {
    login: null,
    password: null,
    loginSuccess: false
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = () => {
    const { login, password } = this.state
    const { signInUser, history } = this.props
    return signInUser(login, password, history).then(() => this.setState({ loginSuccess: true }))
  }

  render() {
    const { submitErrors } = this.props
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
                    <InputField
                      type='text'
                      name='login'
                      id='login'
                      label='Type in e-mail adress or I-qoom ID'
                      onChange={this.handleChange}
                      errorField={submitErrors}
                      placeholder='Company name'
                    />
                  </div>
                  <div className='form-group pt-4'>
                    <InputField
                      type='password'
                      name='password'
                      id='password'
                      label='Type in password'
                      onChange={this.handleChange}
                      errorField={submitErrors}
                      placeholder='Password'
                    />
                  </div>
                  <div className='btn-toolbar pt-4'>
                    <div className='btn-group justify-content-center'>
                      <Link className='col-6 btn btn-back mx-auto' to='/'>
                          <ReactSVG
                            svgStyle={{ height: 15, width: 15, marginRight: 10 }}
                            src={Left}
                          />
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
  signInUser: (login, password, history) => dispatch(signInUser(login, password, history))
})

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('sign_in')(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'sign_in' })(SignIn))

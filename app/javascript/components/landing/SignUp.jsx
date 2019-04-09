import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormSubmitErrors } from 'redux-form'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import { signUpUser } from '../../actions/userActions'
import SelectField from '../../elements/SelectField'
import Checkbox from '../../elements/Checkbox'
import Left from '../../images/arrow-button-left'
import Right from '../../images/arrow-button-right'

class SignUp extends Component {
  state = {
    step: 1,
    userFields: {
      username: null,
      password: null,
      password_confirmation: null,
      first_name: null,
      last_name: null,
      country: null,
      state: null,
      city: null,
      email: null
    }
  }

  handleChange = e => {
    this.setState({
      userFields: {
        ...this.state.userFields,
        [e.target.id]: e.target.checked || e.target.value
      }
    })
  }

  handleChangeSelect = (e, name) => {
    this.setState({
      userFields: {
        ...this.state.userFields,
        [name]: e
      }
    })
  }

  handleSubmit = () => {
    const { signUpUser } = this.props
    const { userFields } = this.state
    return signUpUser(userFields)
  }

  nextStep = () => this.setState({step: 2})
  prevStep = () => this.setState({step: 1})

  render() {
    const {
      username,
      step,
      password,
      password_confirmation,
      first_name,
      last_name,
      country,
      state,
      city,
      email
    } = this.state

    const { showMainPage, submitErrors } = this.props
    const errorField = Object.keys(submitErrors)

    const countries = [
      { value: 'GF', label: 'GF' },
      { value: 'PL', label: 'PL' },
      { value: 'GE', label: 'GE' }
    ]
    const firstFormClass = classnames('form-row', { active: step === 1 })
    const secondFormClass = classnames('form-row', { active: step === 2 })
 
    return (
      <div className='sign-up-form'>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <div className='steps row text-center'>
            <div className='step active col-6'>Step 1</div>
            <div className={classnames('step', 'col-6', { active: step === 2 })}>Step 2</div>
          </div>
          <h2 className='sign-up-form__header text-center'>
            You are two steps away from getting things done. Register for free.
          </h2>
          <div className={firstFormClass} id='first-step-form'>
            <div className='form-group col-6'>
              <div className='form-group'>
                <label htmlFor='first_name'>Type in first name</label>
                <Field
                  type='text'
                  name='first_name'
                  component='input'
                  id='first_name'
                  onChange={this.handleChange}
                  defaultValue={first_name}
                  className={`form-control ${errorField.includes('first_name') ? ' is-invalid' : ''}`}
                  placeholder='First name'
                />
              </div>
              <div className='form-group next-row'>
                <label htmlFor='country'>Select your country</label>
                  <Field
                    name='country'
                    id='country'
                    options={countries}
                    value={country}
                    onChange={(e) => this.handleChangeSelect(e, 'country')}
                    component={SelectField}
                  />
              </div>
            </div>
            <div className='form-group col-6'>
              <div className='form-group'>
                <label htmlFor='last_name'>Type in last name</label>
                <Field
                  type='text'
                  name='last_name'
                  component='input'
                  id='last_name'
                  onChange={this.handleChange}
                  defaultValue={last_name}
                  className='form-control'
                  placeholder='Last name'
                />
              </div>
              <div className='row next-row'>
                <div className='form-group col-6'>
                  <label>Select state</label>
                    <Field
                      name='state'
                      id='state'
                      options={countries}
                      value={state}
                      onChange={(e) => this.handleChangeSelect(e, 'state')}
                      component={SelectField}
                    />
                </div>
                <div className='form-group col-6'>
                  <label>Select city</label>
                    <Field
                      name='city'
                      id='city'
                      options={countries}
                      value={city}
                      onChange={(e) => this.handleChangeSelect(e, 'city')}
                      component={SelectField}
                    />
                </div>
              </div>
            </div>
            <div className='form-buttons col-12 text-center'>
              <button type='button' className='col-3 btn btn-back' onClick={showMainPage}>
                <ReactSVG
                  svgStyle={{ height: 15, width: 15, marginRight: 10 }}
                  src={Left}
                />
                Back
              </button>
              <button type='button' className='col-3 btn btn-primary' onClick={this.nextStep}>
                Next
                <ReactSVG
                  svgStyle={{ height: 15, width: 15, marginLeft: 10 }}
                  src={Right}
                />
              </button>
            </div>
          </div>

          <div className={secondFormClass} id='second-step-form'>
            <div className='form-group col-6'>
              <div className='form-group'>
                <label htmlFor='e-mail-sign-up'>Type in e-mail address</label>
                <Field
                  type='email'
                  name='email'
                  component='input'
                  id='email'
                  onChange={this.handleChange}
                  defaultValue={email}
                  className='form-control'
                  aria-describedby='EMailHelp'
                  placeholder='E-mail'
                />
              </div>
              <div className='form-group next-row'>
                <label htmlFor='password'>Type in password</label>
                <Field
                  type='password'
                  name='password'
                  component='input'
                  id='password'
                  onChange={this.handleChange}
                  defaultValue={password}
                  className='form-control'
                  placeholder='Password'
                />
              </div>
            </div>
            <div className='form-group col-6'>
              <div className='form-group'>
                <label htmlFor='username'>Define your user ID</label>
                <Field
                  type='text'
                  name='username'
                  component='input'
                  id='username'
                  onChange={this.handleChange}
                  defaultValue={username}
                  className='form-control'
                  aria-describedby='usernameHelp'
                  placeholder='Username'
                />
              </div>
              <div className='form-group next-row'>
                <label htmlFor='password_confirmation'>Confirm password</label>
                <Field
                  type='password'
                  component='input'
                  id='password_confirmation'
                  name='password_confirmation'
                  onChange={this.handleChange}
                  defaultValue={password_confirmation}
                  className='form-control'
                  placeholder='Password'
                />
              </div>
            </div>
            <div className='form-check col-12 text-center'>
              <Checkbox
                onChange={this.handleChange}
                name='accept_terms_and_conditions'
                labelClass='form-check-label'
                inputClass='form-check-input'
                checkBoxId='accept_terms_and_conditions'
                text='I accept terms and Conditions'
              />
            </div>
            <div className='form-buttons col-12 text-center'>
              <button type='button' className='col-3 btn btn-back' onClick={this.prevStep}>
                <ReactSVG
                  svgStyle={{ height: 15, width: 15, marginRight: 10 }}
                  src={Left}
                />
                Back
              </button>
              <button type='submit' className='col-3 btn btn-primary'>Register</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('sign_up')(state)
})
const mapDispatchToProps = dispatch => ({
  signUpUser: (userFields) => dispatch(signUpUser(userFields))
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'sign_up' })(SignUp))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormSubmitErrors } from 'redux-form'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import { signUpUser } from '../../actions/userActions'
import SelectField from '../../elements/SelectField'
import Checkbox from '../../elements/Checkbox'
import InputField from '../../elements/InputField'
import Left from '../../images/arrow-button-left'
import Right from '../../images/arrow-button-right'
import countryList from './countiesCodes'

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
                <InputField
                  type='text'
                  name='first_name'
                  id='first_name'
                  label='Type in first name'
                  onChange={this.handleChange}
                  defaultValue={first_name}
                  errorField={submitErrors}
                  placeholder='First name'
                />
              </div>
              <div className='form-group next-row'>
                <label htmlFor='country'>Select your country</label>
                  <Field
                    name='country'
                    id='country'
                    options={countryList}
                    value={country}
                    onChange={(e) => this.handleChangeSelect(e, 'country')}
                    errorField={submitErrors}
                    component={SelectField}
                  />
              </div>
            </div>
            <div className='form-group col-6'>
              <div className='form-group'>
                <InputField
                  type='text'
                  name='last_name'
                  id='last_name'
                  label='Type in last name'
                  onChange={this.handleChange}
                  defaultValue={last_name}
                  errorField={submitErrors}
                  placeholder='Last name'
                />
              </div>
              <div className='row next-row'>
                <div className='form-group col-6'>
                  <InputField
                    type='text'
                    name='state'
                    id='state'
                    label='State'
                    onChange={this.handleChange}
                    defaultValue={state}
                    errorField={submitErrors}
                    placeholder='State'
                  />
                </div>
                <div className='form-group col-6'>
                  <InputField
                    type='text'
                    name='city'
                    id='city'
                    label='City'
                    onChange={this.handleChange}
                    defaultValue={city}
                    errorField={submitErrors}
                    placeholder='City'
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
                <InputField
                  type='text'
                  name='email'
                  id='email'
                  label='Type in e-mail address'
                  onChange={this.handleChange}
                  defaultValue={email}
                  errorField={submitErrors}
                  placeholder='E-mail'
                />
              </div>
              <div className='form-group next-row'>
                <InputField
                  type='password'
                  name='password'
                  id='password'
                  label='Type in password'
                  onChange={this.handleChange}
                  defaultValue={password}
                  errorField={submitErrors}
                  placeholder='Password'
                />
              </div>
            </div>
            <div className='form-group col-6'>
              <div className='form-group'>
                <InputField
                  type='text'
                  name='username'
                  id='username'
                  label='Define your user ID'
                  onChange={this.handleChange}
                  defaultValue={username}
                  errorField={submitErrors}
                  placeholder='Username'
                />
              </div>
              <div className='form-group next-row'>
                <InputField
                  type='password'
                  name='password_confirmation'
                  id='password_confirmation'
                  label='Confirm password'
                  onChange={this.handleChange}
                  defaultValue={password_confirmation}
                  errorField={submitErrors}
                  placeholder='Password'
                />
              </div>
            </div>
            <div className='form-check col-12 text-center'>
              <Checkbox
                onChange={this.handleChange}
                name='accept_terms_and_conditions'
                labelClass='form-check-label'
                checkBoxId='accept_terms_and_conditions'
                text='I accept terms and Conditions'
                errorField={submitErrors}
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

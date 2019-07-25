import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormSubmitErrors, formValueSelector } from 'redux-form'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import { signUpUser } from '../../actions/userActions'
import SelectField from '../../elements/SelectField'
import CheckboxField from '../../elements/CheckboxField'
import InputField from '../../elements/InputField'
import Left from '../../images/arrow-button-left'
import Right from '../../images/arrow-button-right'
import countryList from './countriesCodes'

class SignUp extends Component {
  state = {
    step: 1
  }

  handleSubmit = values => {
    const { signUpUser, history } = this.props
    return signUpUser(values).then(() => history.push({pathname: '/'}))
  }

  nextStep = () => this.setState({step: 2})
  prevStep = () => this.setState({step: 1})

  render() {
    const { step } = this.state
    const { submitErrors, country } = this.props

    const firstFormClass = classnames('form-row', { active: step === 1 })
    const secondFormClass = classnames('form-row', { active: step === 2 })

    return (
      <div id='sign-up-form'>
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
                <Field
                  component={InputField}
                  name='first_name'
                  id='first_name'
                  label='Type in first name'
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
                  newValue={country}
                  errorField={submitErrors}
                  component={SelectField}
                />
              </div>
            </div>
            <div className='form-group col-6'>
              <div className='form-group'>
                <Field
                  component={InputField}
                  name='last_name'
                  id='last_name'
                  label='Type in last name'
                  errorField={submitErrors}
                  placeholder='Last name'
                />
              </div>
              <div className='row next-row'>
                <div className='form-group col-6'>
                  <Field
                    component={InputField}
                    name='state'
                    id='state'
                    label='State'
                    errorField={submitErrors}
                    placeholder='State'
                  />
                </div>
                <div className='form-group col-6'>
                  <Field
                    component={InputField}
                    name='city'
                    id='city'
                    label='City'
                    errorField={submitErrors}
                    placeholder='City'
                  />
                </div>
              </div>
            </div>
            <div className='form-buttons col-12 text-center'>
              <Link to='/' className='col-3 btn btn-back'>
                <ReactSVG
                  svgStyle={{ height: 15, width: 15, marginRight: 10 }}
                  src={Left}
                />
                Back
              </Link>
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
                <Field
                  component={InputField}
                  name='email'
                  id='email'
                  label='Type in e-mail address'
                  errorField={submitErrors}
                  placeholder='E-mail'
                />
              </div>
              <div className='form-group next-row'>
                <Field
                  component={InputField}
                  type='password'
                  name='password'
                  id='password'
                  label='Type in password'
                  errorField={submitErrors}
                  placeholder='Password'
                />
              </div>
            </div>
            <div className='form-group col-6'>
              <div className='form-group'>
                <Field
                  component={InputField}
                  name='username'
                  id='username'
                  label='Define your user ID'
                  errorField={submitErrors}
                  placeholder='Username'
                />
              </div>
              <div className='form-group next-row'>
                <Field
                  component={InputField}
                  type='password'
                  name='password_confirmation'
                  id='password_confirmation'
                  label='Confirm password'
                  errorField={submitErrors}
                  placeholder='Password'
                />
              </div>
            </div>
            <div className='form-check col-12 text-center'>
              <CheckboxField
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

const selector = formValueSelector('sign_up')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('sign_up')(state),
  country: selector(state, 'country'),
})
const mapDispatchToProps = dispatch => ({
  signUpUser: (userFields) => dispatch(signUpUser(userFields))
})

export default connect(mapStateToProps, mapDispatchToProps)
  (reduxForm({
    form: 'sign_up',
    enableReinitialize: true })
  (SignUp))

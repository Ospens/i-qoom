import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { signUpUser } from '../../actions/userActions'
import SelectField from '../../elements/SelectField'
import CheckBoxField from '../../elements/CheckBoxField'
import InputField from '../../elements/InputField'
import countryList from './countriesCodes'
import { required, email, maxLength15, minLength2 } from '../../elements/validations'

function FirstStep() {
  return (
    <div id='first-step-form'>
      <div className='form-row'>
        <Field
          component={InputField}
          className='form-group col-md-6 p-2_5vw-right'
          name='first_name'
          id='first_name'
          label='Type in first name*'
          placeholder='First name'
          validate={[required, minLength2]}
        />
        <Field
          component={InputField}
          className='form-group col-md-6 p-2_5vw-left'
          name='last_name'
          id='last_name'
          label='Type in last name*'
          placeholder='Last name'
          validate={[required, minLength2]}
        />
      </div>
      <div className='form-row'>
        <Field
          className='form-group col-md-6 p-2_5vw-right'
          name='country'
          id='country'
          options={countryList}
          component={SelectField}
          label='Select your country*'
          validate={[required]}
        />
        <Field
          component={InputField}
          className='form-group col-md-3 p-2_5vw-left'
          name='state'
          id='state'
          label='State'
          placeholder='State'
        />
        <Field
          component={InputField}
          className='form-group col-md-3'
          name='city'
          id='city'
          label='City*'
          placeholder='City'
          validate={[required]}
        />
      </div>
      <div className='form-check disabled' />
      <div className='form-buttons col-12 text-center'>
        <Link to='/' className='col-2 btn btn-back'>
          <span className='icon-arrow-button-left' />
          <span>Back</span>
        </Link>
        <button type='submit' className='col-2 btn btn-primary'>
          <span>Next</span>
          <span className='icon-arrow-button-right' />
        </button>
      </div>
    </div>
  )
}

function SecondStep({ prevStep }) {
  return (
    <div id='second-step-form'>
      <div className='form-row'>
        <Field
          component={InputField}
          className='form-group col-md-6 p-2_5vw-right'
          name='email'
          id='email'
          label='Type in e-mail address*'
          placeholder='E-mail'
          validate={[required, email]}
        />
        <Field
          component={InputField}
          className='form-group col-md-6 p-2_5vw-left'
          type='password'
          name='password'
          id='password'
          label='Type in password*'
          placeholder='Password'
          validate={[required]}
        />
      </div>
      <div className='form-row'>
        <Field
          component={InputField}
          className='form-group col-md-6 p-2_5vw-right'
          name='username'
          id='username'
          label='Please chose your username*'
          placeholder='Username'
          validate={[required, maxLength15]}
        />
        <Field
          component={InputField}
          className='form-group col-md-6 p-2_5vw-left'
          type='password'
          name='password_confirmation'
          id='password_confirmation'
          label='Confirm password*'
          placeholder='Password'
          validate={[required]}
        />
      </div>
      <div className='form-check col-12 text-center'>
        <Field
          component={CheckBoxField}
          className='form-check-label'
          name='accept_terms_and_conditions'
          id='accept_terms_and_conditions'
          text={<Link to='/terms' target='_blank'>I accept Terms & Conditions</Link>}
          validate={[required]}
        />
      </div>
      <div className='form-buttons row text-center'>
        <button type='button' className='col-2 btn btn-back' onClick={prevStep}>
          <span className='icon-arrow-button-left' />
          Back
        </button>
        <button type='submit' className='col-2 btn btn-primary'>Register</button>
      </div>
    </div>
  )
}

function SignUp({ handleSubmit }) {
  const dispatch = useDispatch()
  const [step, setStep] = useState(1)
  const history = useHistory()

  const submit = useCallback(values => {
    if (step < 2) {
      setStep(2)
      return
    }
    return dispatch(signUpUser(values)).then(() => history.push({ pathname: '/signedup' }))
  }, [dispatch, step])

  return (
    <div id='sign-up-form'>
      <form noValidate={true} onSubmit={handleSubmit(submit)}>
        <div className='steps row text-center'>
          <div className='step active col-6'>Step 1</div>
          <div className={classnames('step', 'col-6', { active: step === 2 })}>Step 2</div>
        </div>
        <h2 className='sign-up-form__header text-center'>
          You are {step > 1 ? 'one step' : 'two steps'} away from getting things done. Register for free.
          </h2>
        <div className='form-fields'>
          {step === 1 ? <FirstStep /> : <SecondStep prevStep={() => setStep(1)}/>}
        </div>
      </form>
    </div>
  )
}

export default reduxForm({ form: 'sign_up' })(SignUp)

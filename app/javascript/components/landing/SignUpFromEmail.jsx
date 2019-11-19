import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link, useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { signUpUser } from '../../actions/userActions'
import SelectField from '../../elements/SelectField'
import CheckField from '../../elements/CheckField'
import InputField from '../../elements/InputField'
import { required, email, maxLength15 } from '../../elements/validations'

function FirstStep({ onSubmit }) {
  return (
    <form noValidate={true} onSubmit={onSubmit}>
      <h2 className='sign-up-form__header text-center'>
        Welcome to i-Qoom John Doe, Please define a Password!
      </h2>
      <div>
        <div className='sign-up-from-email'>
          <Field
            component={InputField}
            className='form-group'
            name='password'
            id='password'
            label='Type in password*'
            placeholder='Password'
            validate={[required]}
          />
          <Field
            component={InputField}
            className='form-group'
            name='password_confirmation'
            id='password_confirmation'
            label='Confirm password*'
            placeholder='Password'
            validate={[required]}
          />
          <div className='form-check col-12 text-center'>
            <Field
              component={CheckField}
              className='form-check-label'
              name='accept_terms_and_conditions'
              id='accept_terms_and_conditions'
              text={<Link to='/terms' target='_blank'>I accept Terms & Conditions</Link>}
              validate={[required]}
            />
          </div>
          <div className='form-buttons text-center mx-auto'>
            <button type='submit' className='mx-auto btn btn-primary'>
              Finish registration
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

function SecondStep({ prevStep }) {
  return (
    <form noValidate={true}>
      <h2 className='sign-up-form__header text-center'>
        Success! You are now registered. This is your member ID, you will need it to login.
      </h2>
      <div className='sign-up-from-email text-center'>
        <div className='sign-up-from-email__info'>Don’t worry, it will be sent via email, too.</div>
        <div className='sign-up-from-email__id-for'>John Does memberID:</div>
        <div className='sign-up-from-email__member-id'>i-JD1234</div>
        <div className='form-buttons text-center'>
          <Link to='/menu' className='btn btn-primary'>OK</Link>
        </div>
      </div>
    </form>
  )
}

function SignUpFromEmail({ handleSubmit }) {
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
      {step < 2 ? <FirstStep onSubmit={handleSubmit(submit)}/> : <SecondStep /> }
    </div>
  )
}

export default reduxForm({ form: 'sign_up' })(SignUpFromEmail)

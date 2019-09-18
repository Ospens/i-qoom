import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { signInUser } from '../../actions/userActions'
import InputField from '../../elements/InputField'
import { required } from '../../elements/validations'

function SignIn({ handleSubmit, history }) {
  const dispatch = useDispatch()

  const submit = useCallback((values) => {
    return dispatch(signInUser(values)).then(() => history.push({ pathname: '/menu' }))
  }, [dispatch])

  return (
    <section id='first-card'>
      <div className='container'>
        <div className='welcome-and-signin justify-content-center'>
          <div className={classnames('sign-in-form', { 'show-slider': false })}>
            <form noValidate={true} onSubmit={handleSubmit(submit)}>
              <h2 className='sign-in-form__header text-center'>Log into your accont</h2>
              <div className='form-group'>
                <Field
                  component={InputField}
                  name='login'
                  id='login'
                  label='Type in e-mail adress or i-Qoom ID'
                  placeholder='E-mail or i-Qoom ID'
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

export default withRouter(reduxForm({ form: 'sign_in' })(SignIn))

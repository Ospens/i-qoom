import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { signInUser } from '../../actions/userActions'
import InputField from '../../elements/InputField'
import { required } from '../../elements/validations'
import { errorNotify, successNotify } from '../../actions/notificationsActions'

function SignIn({ handleSubmit, history, ...props }) {
  const dispatch = useDispatch()

  // TODO: It is a hotfix and should be changed
  useEffect(() => {
    if (!props.match.params.msg) return

    props.match.params.type === 'error'
      ? dispatch(errorNotify('System', props.match.params.msg))
      : dispatch(successNotify('System', props.match.params.msg))
  }, [])

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
              <div className='form-group-with-icon'>
                <span className='icon-single-neutral white' />
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
              </div>
              <div className='form-group-with-icon'>
                <span className='icon-password-type white' />
                <div className='form-group'>
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
              </div>
              <div className='btn-toolbar'>
                <div className='btn-group justify-content-center'>
                  <Link className='col-6 btn btn-back mx-auto' to='/'>
                    <span className='icon-arrow-button-left' />
                    Back
                  </Link>
                </div>
                <div className='btn-group justify-content-center'>
                  <button type='submit' className='col-12 btn btn-primary'>Login</button>
                </div>
              </div>
            </form>
            <div className='forgot-password-block'>
              <div className='forgot-password-block__firstline'>
                You forgot your <Link to='/restore-password'>Password</Link>?
              </div>
              <div className='forgot-password-block__second'>
                You are not registered? <Link to='/signup'>Register here</Link>!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default withRouter(reduxForm({ form: 'sign_in' })(SignIn))

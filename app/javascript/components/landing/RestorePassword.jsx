import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { useHistory } from 'react-router-dom'
import { resetPassword } from '../../actions/userActions'
import InputField from '../../elements/InputField'
import { required, email } from '../../elements/validations'

function RestorePassword({ handleSubmit }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const submit = useCallback(values => {
    return dispatch(resetPassword(values, () => history.push({ pathname: '/' })))
  }, [dispatch])

  return (
    <section id='first-card'>
      <div className='container'>
        <div className='welcome-and-signin justify-content-center'>
          <form
            noValidate={true}
            onSubmit={handleSubmit(submit)}
            className='restore-password-block'
          >
            <div className='restore-password-content'>
              <div className='restore-password-content__header'>
                Forgot Password?
              </div>
              <div className='restore-password-content__text-msg'>
                Just submit your e-mail address. After you submitted your email address,
                you will get a conformation link. Then, you can enter a new password.
              </div>
              <Field
                component={InputField}
                name='email'
                label='Just type in your e-mail address'
                placeholder='E-mail address'
                validate={[required, email]}
                className='form-group'
              />
              <div className='btn-block'>
                <button type='submit' className='btn btn-primary'>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

  )
}

export default reduxForm({ form: 'restore_password' })(RestorePassword)

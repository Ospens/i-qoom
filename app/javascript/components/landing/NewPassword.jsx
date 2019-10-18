import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { updatePassword } from '../../actions/userActions'
import InputField from '../../elements/InputField'
import { required, minLength6 } from '../../elements/validations'

const passwordsMatch = (value, allValues) =>
  value !== allValues.user.password ? 'Passwords don\'t match' : undefined

function NewPassword({ handleSubmit }) {
  const dispatch = useDispatch()
  const match = useRouteMatch('/new-password/:token/')
  const history = useHistory()
  
  const submit = useCallback(values => {
    return dispatch(updatePassword({ ...values, token: match.params.token }, () => history.push({ pathname: '/signin' })))
  }, [dispatch, match])

  return (
    <div id='new-password-form'>
      <form noValidate={true} onSubmit={handleSubmit(submit)}>
        <h2 className='new-password-form__header'>
          Please define a new password!
        </h2>
        <div className='new-password-form__body'>
          <div className='new-password-form__body-info'>
            After entering a new one, the password is successfully reset.
          </div>
          <Field
            component={InputField}
            name='user[password]'
            type='password'
            label='Type in password'
            placeholder='Password'
            validate={[required, minLength6]}
            className='form-group'
          />
          <Field
            component={InputField}
            name='user[confirm_password]'
            type='password'
            label='Confirm password'
            placeholder='Password'
            validate={[required, passwordsMatch, minLength6]}
            className='form-group confirm_password'
          />
          <div className='btn-block'>
            <button type='submit' className='btn btn-primary'>Confirm</button>
          </div>
        </div>
      </form>
    </div>

  )
}

export default reduxForm({ form: 'new_password' })(NewPassword)

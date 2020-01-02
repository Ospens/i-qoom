import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { updatePassword } from '../../actions/userActions'
import InputField from '../../elements/InputField'
import { required, minLength6, passwordsMatch } from '../../elements/validations'

function NewPassword({ handleSubmit }) {
  const dispatch = useDispatch()
  const match = useRouteMatch('/new-password/:token/')
  const history = useHistory()

  const submit = useCallback(values => {
    const v = { user: { ...values } }
    return dispatch(updatePassword({ ...v, token: match.params.token }, () => history.push({ pathname: '/signin' })))
  }, [dispatch, history, match.params.token])

  return (
    <div id="new-password-form">
      <form noValidate onSubmit={handleSubmit(submit)}>
        <h2 className="new-password-form__header">
          Please define a new password!
        </h2>
        <div className="new-password-form__body">
          <div className="new-password-form__body-info">
            After entering a new one, the password is successfully reset.
          </div>
          <Field
            component={InputField}
            name="password"
            type="password"
            label="Type in password"
            placeholder="Password"
            validate={[required, minLength6]}
            className="form-group"
          />
          <Field
            component={InputField}
            name="password_confirmation"
            type="password"
            label="Confirm password"
            placeholder="Password"
            validate={[required, passwordsMatch, minLength6]}
            className="form-group confirm_password"
          />
          <div className="btn-block">
            <button type="submit" className="btn btn-primary">Confirm</button>
          </div>
        </div>
      </form>
    </div>

  )
}

export default reduxForm({ form: 'new_password' })(NewPassword)

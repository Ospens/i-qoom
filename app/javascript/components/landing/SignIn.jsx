import React, { useCallback, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import { Field, reduxForm } from 'redux-form'
import { signInUser } from '../../actions/userActions'
import InputField from '../../elements/InputField'
import { required } from '../../elements/validations'
import { addNotification } from '../../actions/notificationsActions'
import { startConfirmMember } from '../../actions/projectMembersActions'

function SignIn({ handleSubmit }) {
  const dispatch = useDispatch()
  const { type, msg } = useParams()
  const history = useHistory()

  // TODO: It is a hotfix and should be changed
  useEffect(() => {
    if (!msg) return

    if (type === 'error') {
      dispatch(addNotification({ title: 'Problem', text: msg, type: 'error' }))
    } else {
      dispatch(addNotification({ title: 'System', text: msg, type: 'success' }))
    }
  }, [dispatch, msg, type])

  const submit = useCallback(values => {
    dispatch(signInUser(values))
      .then(() => {
        const token = localStorage.getItem('newUserToken')
        const newUserMemberId = localStorage.getItem('newUserMemberId')
        const user = localStorage.getItem('i-qoom-user')
        if (token && JSON.parse(user).member_id === newUserMemberId) {
          dispatch(startConfirmMember(token)).then(() => {
            dispatch(addNotification({ title: 'System', text: 'You successfully accepted the invite!', type: 'success' }))
          })
        }
        history.push({ pathname: '/menu' })
      })
  }, [dispatch, history])

  return (
    <section id="first-card">
      <div className="container">
        <div className="welcome-and-signin justify-content-center">
          <div className={classnames('sign-in-form', { 'show-slider': false })}>
            <form noValidate onSubmit={handleSubmit(submit)}>
              <h2 className="sign-in-form__header text-center">Log into your account</h2>
              <div className="form-group-with-icon">
                <span className="icon-single-neutral white" />
                <div className="form-group">
                  <Field
                    component={InputField}
                    name="login"
                    id="login"
                    label="Type in e-mail adress or i-Qoom ID"
                    placeholder="E-mail or i-Qoom ID"
                    validate={[required]}
                  />
                </div>
              </div>
              <div className="form-group-with-icon">
                <span className="icon-password-type white" />
                <div className="form-group">
                  <Field
                    component={InputField}
                    type="password"
                    name="password"
                    id="password"
                    label="Type in password"
                    placeholder="Password"
                    validate={[required]}
                  />
                </div>
              </div>
              <div className="btn-toolbar">
                <div className="btn-group justify-content-center">
                  <Link className="col-6 btn btn-back mx-auto" to="/">
                    <span className="icon-arrow-button-left" />
                    Back
                  </Link>
                </div>
                <div className="btn-group justify-content-center">
                  <button type="submit" className="col-12 btn btn-primary">Login</button>
                </div>
              </div>
            </form>
            <div className="forgot-password-block">
              <div className="forgot-password-block__firstline">
                <span>You forgot your </span>
                <Link to="/restore-password">Password</Link>
                <span>?</span>
              </div>
              <div className="forgot-password-block__second">
                <span>You are not registered? </span>
                <Link to="/signup">Register here</Link>
                <span>!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default reduxForm({ form: 'sign_in' })(SignIn)

import React, {
  useState, useCallback, useEffect, Fragment
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  Link, useHistory, useParams
} from 'react-router-dom'
import { signUpUser } from '../../actions/userActions'
import CheckField from '../../elements/CheckField'
import InputField from '../../elements/InputField'
import { required } from '../../elements/validations'
import { addNotification } from '../../actions/notificationsActions'
import { startConfirmMember } from '../../actions/projectMembersActions'

const linkText = <Link to="/terms" target="_blank">I accept Terms & Conditions</Link>

function firstStep(onSubmit, memberName) {
  return (
    <form noValidate onSubmit={onSubmit}>
      <h2 className="sign-up-form__header text-center">
        {`Welcome to i-Qoom ${memberName}, Please define a Password!`}
      </h2>
      <div>
        <div className="sign-up-from-email">
          <Field
            component={InputField}
            className="form-group"
            name="password"
            id="password"
            label="Type in password*"
            placeholder="Password"
            validate={[required]}
            type="password"
          />
          <Field
            component={InputField}
            className="form-group"
            name="password_confirmation"
            id="password_confirmation"
            label="Confirm password*"
            placeholder="Password"
            validate={[required]}
            type="password"
          />
          <div className="form-check col-12 text-center">
            <Field
              component={CheckField}
              className="form-check-label"
              name="accept_terms_and_conditions"
              id="accept_terms_and_conditions"
              text={linkText}
              validate={[required]}
            />
          </div>
          <div className="form-buttons text-center mx-auto">
            <button type="submit" className="mx-auto btn btn-primary">
              Finish registration
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

function SecondStep({ memberName }) {
  const dispatch = useDispatch()
  const newMemberId = useSelector(state => state.user.newUser.member_id)

  useEffect(() => {
    localStorage.setItem('newUserMemberId', newMemberId)
    dispatch(addNotification({ title: 'System', text: `Please login with ${newMemberId} memberID`, type: 'info' }))
  }, [dispatch, newMemberId])

  return (
    <form noValidate>
      <h2 className="sign-up-form__header text-center">
        Success! You are now registered. This is your member ID, you will need it to login.
      </h2>
      <div className="sign-up-from-email text-center">
        <div className="sign-up-from-email__info">Don’t worry, it will be sent via email, too.</div>
        <div className="sign-up-from-email__id-for">{`MemberId of ${memberName}`}</div>
        <div className="sign-up-from-email__member-id">{newMemberId}</div>
        <div className="form-buttons text-center">
          <Link to="/signin" className="btn btn-primary">OK</Link>
        </div>
      </div>
    </form>
  )
}

function MemberConfirmation({ handleSubmit, initialize }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { token } = useParams()
  const [step, setStep] = useState(1)
  const [memberName, setMemberName] = useState('')
  const submit = useCallback(values => {
    dispatch(signUpUser(values)).then(() => setStep(2))
  }, [dispatch])

  useEffect(() => {
    dispatch(startConfirmMember(token))
      .then((r => {
        if (r.data && r.data.project_member) {
          localStorage.setItem('newUserToken', token)
          const { data: { project_member: { full_name: fullName, id } } } = r
          setMemberName(fullName)
          initialize({ project_member_id: id })
        } else if (r.status === 422) {
          const text = r.data && r.data.token
            ? r.data.token.map(p => p.replace('problem:', '')).join(',')
            : 'Please login with the correct memberID'
          history.push({ pathname: '/signin' })
          dispatch(addNotification({ title: 'System', text, type: 'error' }))
        } else if (r.status === 200) {
          history.push({ pathname: '/menu' })
          dispatch(addNotification({ title: 'System', text: 'You are successfully accepted the invite!', type: 'success' }))
        }
      }))
  }, [dispatch, history, initialize, token])

  if (!token || memberName.length < 1) return <Fragment />

  return (
    <div id="sign-up-form">
      {step < 2
        ? firstStep(handleSubmit(submit), memberName)
        : <SecondStep memberName={memberName} />}
    </div>
  )
}

export default reduxForm({ form: 'sign_up' })(MemberConfirmation)

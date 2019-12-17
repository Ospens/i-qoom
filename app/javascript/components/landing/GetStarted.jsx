import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import ReactSVG from 'react-svg'
import classnames from 'classnames'
import InputField from '../../elements/InputField'
import TextAreaField from '../../elements/TextAreaField'
import lines from '../../images/send-lines.svg'
import plan from '../../images/send-email-big.svg'
import { required, email, minLength } from '../../elements/validations'
import sendEmail from '../../actions/otherActions'

const successMsg = () => (
  <div className="send-card">
    <div className="text-center">Your contact request has been sent!</div>
    <div className="pictures-container">
      <ReactSVG
        src={plan}
        svgClassName="svg-plan"
        className="svg-container"
      />
      <ReactSVG
        src={lines}
        svgClassName="svg-line"
        className="svg-container"
      />
    </div>
  </div>
)

function GetStarted({ reset, handleSubmit }) {
  const dispatch = useDispatch()
  const title = useSelector(state => state.landing.getStarted.title)
  const [sent, setSent] = useState(false)
  const successFunc = useCallback(() => {
    setSent(true)
    reset()
  }, [])
  const onsubmit = useCallback(values => {
    dispatch(sendEmail(values, successFunc))
  }, [dispatch, reset])
  const containerClass = classnames('form-container', { 'show-slider': sent })

  return (
    <section id="get-started-card">
      <div className="container">
        {/*
            TODO: temporarily disabled
          authed && editable ?
            (
              <TextEditor text={title} className='mb-5'/>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: title }} className='mb-5'/>
            ) */}
        <div dangerouslySetInnerHTML={{ __html: title }} className="get-started-card__title" />
        <div className={containerClass}>
          {successMsg()}

          <form
            noValidate
            className="contact-us-form"
            onSubmit={handleSubmit(onsubmit)}
          >
            <div className="form-row">
              <div className="col left-column">
                <Field
                  component={InputField}
                  className="form-group email"
                  name="email"
                  id="email"
                  validate={[email, required]}
                  label="Enter your E-mail address"
                  placeholder="E-mail"
                />
                <Field
                  component={InputField}
                  className="form-group phone"
                  name="phone_number"
                  id="phone"
                  validate={[required]}
                  label="Enter your Phone number"
                  placeholder="0049 160 000000"
                />
              </div>
              <Field
                component={TextAreaField}
                name="text"
                id="text"
                rows="3"
                validate={[minLength(15), required]}
                placeholder="Text"
                className="form-group col textarea-column"
                label="Enter your Text"
              />
            </div>
            <div className="text-center">
              <button className="col-2 btn btn-primary mx-auto" type="submit">
                Send
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  )
}

export default reduxForm({ form: 'contact_us' })(GetStarted)

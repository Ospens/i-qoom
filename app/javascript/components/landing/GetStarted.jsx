import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import ReactSVG from 'react-svg'
import classnames from 'classnames'
import InputField from '../../elements/InputField'
import TextAreaField from '../../elements/TextAreaField'
import lines from '../../images/send-lines'
import plan from '../../images/send-email-big'
// import TextEditor from '../../elements/TextEditor'
import { required, email, minLength } from '../../elements/validations'
import { sendEmail } from '../../actions/otherActions'

class GetStarted extends Component {
  state = {
    sent: false
  }

  successFunc = () => {
    const { reset } = this.props
    this.setState({ sent: true })
    reset()
  }

  handleSubmit = values => {
    const { sendEmail } = this.props
    sendEmail(values, this.successFunc)
  }

  renderContactForm = () => {
    const { handleSubmit } = this.props

    return (
      <form
        className='contact-us-form'
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <div className='form-row'>
          <div className='col-md-6 left-column'>
            <Field
              component={InputField}
              className='form-group email'
              name='email'
              id='email'
              validate={[email, required]}
              label='Enter your E-mail address'
              placeholder='E-mail'
            />
            <Field
              component={InputField}
              className='form-group phone'
              name='phone_number'
              id='phone'
              validate={[required]}
              label='Enter your Phone number'
              placeholder='0049 160 000000'
            />
          </div>
          <Field
            component={TextAreaField}
            name='text'
            id='text'
            rows='3'
            validate={[minLength(15), required]}
            placeholder='Text'
            className='form-group col-md-6'
            label='Enter your Text'
          />
        </div>
        <div className='text-center'>
          <button className='col-2 btn btn-primary mx-auto' type='submit'>
            Send
          </button>
        </div>
      </form>
    )
  }

  renderSuccessMsg = () => {
    return (
      <div className='send-card'>
        <div className='text-center'>Your contact request has been sent!</div>
        <div className='pictures-container'>
          <ReactSVG
            src={lines}
            svgClassName='svg-line'
          />
          <ReactSVG
            src={plan}
            svgClassName='svg-plan'
          />
        </div>
      </div>
    )
  }

  render() {
    const { title } = this.props
    const { sent } = this.state
    const containerClass = classnames('form-container', { 'show-slider': sent })

    return (
      <section id='get-started-card'>
        <div className='container'>
          {/*
            TODO: temporarily disabled
          authed && editable ?
            (
              <TextEditor text={title} className='mb-5'/>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: title }} className='mb-5'/>
            )*/}
          <div dangerouslySetInnerHTML={{ __html: title }} className='mb-5' />
          <div className={containerClass}>
            {this.renderSuccessMsg()}
            {this.renderContactForm()}
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  // authed: state.user.authStatus,
  title: state.landing.getStarted.title,
})

const mapDispatchToProps = dispatch => ({
  sendEmail: (values, afterUpdate) => dispatch(sendEmail(values, afterUpdate))
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'contact_us' })(GetStarted))

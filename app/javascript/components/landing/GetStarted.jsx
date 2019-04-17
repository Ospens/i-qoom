import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFormSyncErrors, Field, reduxForm } from 'redux-form'
import ReactSVG from 'react-svg'
import { errorNotify } from '../../elements/Notices'
import axios from 'axios'
import classnames from 'classnames'
import InputField from '../../elements/InputField'
import lines from '../../images/send-lines'
import plan from '../../images/send-email-big'

const emailValid = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? ['Invalid email address']
    : undefined

const minValue = min => value =>
  value && value < min ? [`Must be at least ${min}`] : undefined

class GetStarted extends Component {
  state = {
    sent: false,
    email: null,
    phone: null,
    text: null
  }

  sendMessage = (e) => {
    e.preventDefault()
    const { phone, text, email} = e.target
    const request = {
      contact: {
        email: email.value,
        text: text.value,
        phone_number: phone.value,
      }
    }
    const { reset } = this.props
    axios.post('/api/v1/contacts', request)
      .then(() => {
        this.setState({
          email: null,
          phone: null,
          text: null,
          sent: true
        })
        reset()
      })
      .catch(({ response }) => {
        errorNotify(response.data.message)
      })
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  renderContactForm = () => {
    const { email, phone, text } = this.state
    const allFilled = !email || !phone || !text
    const { synchronousError } = this.props
    return (
      <form onSubmit = {this.sendMessage} className='contact-us-form'>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <div className='form-group'>
              <InputField
                type='text'
                name='email'
                id='email'
                validate={emailValid}
                errorField={synchronousError}
                onChange={this.handleChange}
                label='Enter your E-mail address'
                aria-describedby='loginHelp'
                placeholder='E-mail'
              />
            </div>
            <div className='form-group form-number-group'>
              <InputField
                type='text'
                name='phone'
                id='phone'
                errorField={synchronousError}
                onChange={this.handleChange}
                label='Enter your Phone number'
                placeholder='0049 160 000000'
              />
            </div>
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='phone'>Enter your Text</label>
            <Field
              name='text'
              id='text'
              component='textarea'
              rows='6'
              validate={minValue}
              onChange={this.handleChange}
              className='form-control'
              placeholder='Text'
            />
          </div>
        </div>
        <div className='text-center'>
          <button type='submit' disabled={allFilled} className='col-4 btn btn-primary'>Send</button>
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
    const { sent } = this.state
    const containerClass = classnames('form-container', { 'show-slider': sent })
    return (
      <section id='get-started-card'>
        <div className='container'>
          <h2 className='text-center block-header'>Contact - Let's get started!</h2>
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
  synchronousError: getFormSyncErrors('contact_us')(state)
})

export default connect(mapStateToProps, null)(reduxForm({ form: 'contact_us' })(GetStarted))

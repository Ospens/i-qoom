import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { signUpUser } from '../../actions/userActions'
import SelectField from '../../elements/SelectField'
import CheckField from '../../elements/CheckField'
import InputField from '../../elements/InputField'
import countryList from './countriesCodes'
import { required, email, maxLength15 } from '../../elements/validations'

class SignUp extends Component {
  state = {
    step: 1
  }

  handleSubmit = values => {
    const { step } = this.state
    if (step < 2) {
      this.nextStep()
      return
    }
    const { signUpUser, history } = this.props
    return signUpUser(values).then(() => history.push({pathname: '/'}))
  }

  nextStep = () => this.setState({step: 2})

  prevStep = () => this.setState({step: 1})

  renderFirstStep = () => (
    <div id='first-step-form'>
      <div className='form-row'>
        <Field
          component={InputField}
          className='form-group col-md-6 p-2_5vw-right'
          name='first_name'
          id='first_name'
          label='Type in first name*'
          placeholder='First name'
          validate={[required]}
        />
        <Field
          component={InputField}
          className='form-group col-md-6 p-2_5vw-left'
          name='last_name'
          id='last_name'
          label='Type in last name*'
          placeholder='Last name'
          validate={[required]}
        />
      </div>
      <div className='form-row'>
        <Field
          className='form-group col-md-6 p-2_5vw-right'
          name='country'
          id='country'
          options={countryList}
          component={SelectField}
          label='Select your country*'
          validate={[required]}
        />
        <Field
          component={InputField}
          className='form-group col-md-3 p-2_5vw-left'
          name='state'
          id='state'
          label='State'
          placeholder='State'
        />
        <Field
          component={InputField}
          className='form-group col-md-3'
          name='city'
          id='city'
          label='City*'
          placeholder='City'
          validate={[required]}
        />
      </div>
      <div className='form-check disabled' />
      <div className='form-buttons col-12 text-center'>
        <Link to='/' className='col-2 btn btn-back'>
          <span className='icon-arrow-button-left' />
          Back
        </Link>
        <button type='submit' className='col-2 btn btn-primary'>
          Next
          <span className='icon-arrow-button-right' />
        </button>
      </div>
    </div>
  )

  renderSecondStep = () => (
    <div id='second-step-form'>
      <div className='form-row'>
        <Field
          component={InputField}
          className='form-group col-md-6 p-2_5vw-right'
          name='email'
          id='email'
          label='Type in e-mail address*'
          placeholder='E-mail'
          validate={[required, email]}
        />
        <Field
          component={InputField}
          className='form-group col-md-6 p-2_5vw-left'
          type='password'
          name='password'
          id='password'
          label='Type in password*'
          placeholder='Password'
          validate={[required]}
        />
      </div>
      <div className='form-row'>
        <Field
          component={InputField}
          className='form-group col-md-6 p-2_5vw-right'
          name='username'
          id='username'
          label='Please chose your username*'
          placeholder='Username'
          validate={[required, maxLength15]}
        />
        <Field
          component={InputField}
          className='form-group col-md-6 p-2_5vw-left'
          type='password'
          name='password_confirmation'
          id='password_confirmation'
          label='Confirm password*'
          placeholder='Password'
          validate={[required]}
        />
      </div>
      <div className='form-check col-12 text-center'>
        <Field
          component={CheckField}
          className='form-check-label'
          name='accept_terms_and_conditions'
          id='accept_terms_and_conditions'
          text={<Link to='/terms' target='_blank'>I accept Terms & Conditions</Link>}
          validate={[required]}
        />
      </div>
      <div className='form-buttons row text-center'>
        <button type='button' className='col-2 btn btn-back' onClick={this.prevStep}>
          <span className='icon-arrow-button-left' />
          Back
        </button>
        <button type='submit' className='col-2 btn btn-primary'>Register</button>
      </div>
    </div>
  )

  render() {
    const { step } = this.state

    return (
      <div id='sign-up-form'>
        <form noValidate={true} onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <div className='steps row text-center'>
            <div className='step active col-6'>Step 1</div>
            <div className={classnames('step', 'col-6', { active: step === 2 })}>Step 2</div>
          </div>
          <h2 className='sign-up-form__header text-center'>
            You are {step > 1 ? 'one step' : 'two steps'} away from getting things done. Register for free.
          </h2>
          <div className='form-fields'>
            {step === 1
              ? this.renderFirstStep()
              : this.renderSecondStep()}
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signUpUser: (userFields) => dispatch(signUpUser(userFields))
})

export default connect(null, mapDispatchToProps)
  (reduxForm({ form: 'sign_up' })
  (SignUp))

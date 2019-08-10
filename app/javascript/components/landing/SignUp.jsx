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
import { required, email, maxValue } from '../../elements/validations'

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
          className='form-group col-md-6'
          name='first_name'
          id='first_name'
          label='Type in first name'
          placeholder='First name'
          validate={[required]}
        />
        <Field
          component={InputField}
          className='form-group col-md-6'
          name='last_name'
          id='last_name'
          label='Type in last name'
          placeholder='Last name'
          validate={[required]}
        />
      </div>
      <div className='form-row'>
        <Field
          className='form-group col-md-6'
          name='country'
          id='country'
          options={countryList}
          component={SelectField}
          label='Select your country'
          validate={[required]}
        />
        <Field
          component={InputField}
          className='form-group col-md-3'
          name='state'
          id='state'
          label='State'
          placeholder='State'
          validate={[required]}
        />
        <Field
          component={InputField}
          className='form-group col-md-3'
          name='city'
          id='city'
          label='City'
          placeholder='City'
          validate={[required]}
        />
      </div>
      <div className='form-buttons col-12 text-center'>
        <Link to='/' className='col-3 btn btn-back'>
          <i className='svg-icon arrow-left-icon' />
          Back
        </Link>
        <button type='submit' className='col-3 btn btn-primary'>
          Next
          <i className='svg-icon arrow-right-icon' />
        </button>
      </div>
    </div>
  )

  renderSecondStep = () => (
    <div id='second-step-form'>
      <div className='form-row'>
        <Field
          component={InputField}
          className='form-group col-md-6'
          name='email'
          id='email'
          label='Type in e-mail address'
          placeholder='E-mail'
          validate={[required, email]}
        />
        <Field
          component={InputField}
          className='form-group col-md-6'
          type='password'
          name='password'
          id='password'
          label='Type in password'
          placeholder='Password'
          validate={[required]}
        />
      </div>
      <div className='form-row'>
        <Field
          component={InputField}
          className='form-group col-md-6'
          name='username'
          id='username'
          label='Define your user ID'
          placeholder='Username'
          validate={[required, maxValue(18)]}
        />
        <Field
          component={InputField}
          className='form-group col-md-6'
          type='password'
          name='password_confirmation'
          id='password_confirmation'
          label='Confirm password'
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
          text='I accept terms and Conditions'
          validate={[required]}
        />
      </div>
      <div className='form-buttons col-12 text-center mt-5'>
        <button type='button' className='col-3 btn btn-back' onClick={this.prevStep}>
          <i className='svg-icon arrow-left-icon' />
            Back
          </button>
        <button type='submit' className='col-3 btn btn-primary'>Register</button>
      </div>
    </div>
  )

  render() {
    const { step } = this.state

    return (
      <div id='sign-up-form'>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <div className='steps row text-center'>
            <div className='step active col-6'>Step 1</div>
            <div className={classnames('step', 'col-6', { active: step === 2 })}>Step 2</div>
          </div>
          <h2 className='sign-up-form__header text-center'>
            You are two steps away from getting things done. Register for free.
          </h2>
          {step === 1
            ? this.renderFirstStep()
            : this.renderSecondStep()}
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

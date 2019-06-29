import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field,getFormSubmitErrors, reduxForm } from 'redux-form'
import SelectField from '../../../../elements/SelectField'

const options = [
  { value: 'employee', label: 'Employee' },
  { value: 'internal_contractor', label: 'Internal contractor' },
  { value: 'external_contractor', label: 'External contractor' }
]

class ModalTypeEmployment extends Component {

  handleSubmit = (values) => {
    const { changeStep } = this.props
    changeStep(2)
  }

  render() {
    const { submitErrors, closeModal, pristine } = this.props
    return (
      <div className='new-project-modal'>
        <h4>New member</h4>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <div className='modal-body project-name'>
            <h6>Please select type of employment</h6>
            <div className='form-group'>
              <Field
                name='employment_type'
                id='employment_type'
                options={options}
                errorField={submitErrors}
                component={SelectField}
              />
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
            <button
              type='submit'
              className='btn btn-purple'
              disabled={pristine}
            >
              Next
          </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('member_form')(state)
})

export default connect(mapStateToProps)(reduxForm({form: 'member_form', destroyOnUnmount: false})(ModalTypeEmployment))

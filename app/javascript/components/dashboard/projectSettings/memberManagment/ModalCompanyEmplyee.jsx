import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, getFormSubmitErrors, reduxForm, formValueSelector } from 'redux-form'
import ModalComponent from '../../../../elements/ModalComponent'
import SelectField from '../../../../elements/SelectField'

const options = [
  { value: 'project_company', label: 'Project company' },
  { value: 'parent_company', label: 'Parent company' },
  { value: 'joint_venture_company', label: 'Joint venture company' }
]

class ModalCompanyEmplyee extends Component {
  state = {  }

  handleSubmit = (values) => {
    const { changeStep } = this.props
    changeStep(3)
  }

  render() {
    const { submitErrors, closeModal, pristine, employment_type } = this.props
    return (
      <ModalComponent>
        <div className='new-project-modal'>
          <h4>New member</h4>
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <div className='modal-body project-name'>
              <h6>From which company is the employee?</h6>
              <div className='form-group'>
                <Field
                  name='employment_type'
                  id='employment_type'
                  options={options}
                  defaultValue={options.filter(option => option.value === employment_type)[0]}
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
      </ModalComponent>
    )
  }
}

const selector = formValueSelector('member_form')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('member_form')(state),
  employment_type: selector(state, 'employment_type')
})

export default connect(mapStateToProps)(reduxForm({ form: 'member_form', destroyOnUnmount: false })(ModalCompanyEmplyee))

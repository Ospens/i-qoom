import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  reduxForm,
  FormSection,
  Field
} from 'redux-form'
import AddressFields from '../../../../elements/forms/AddressFields'
import InputField from '../../../../elements/InputField'
import SelectField from '../../../../elements/SelectField'
import {
  startCreateProjectMember,
  startCreatingProjectMember,
  startUpdateProjectMember
} from '../../../../actions/projectMembersActions'
import { required, email } from '../../../../elements/validations'

function Footer({
  handleSubmit, onSubmit, step, changeStep, closeModal
}) {
  return (
    <div className="new-modal__footer">
      {step > 1
        && (
          <button
            type="button"
            className="btn btn-back"
            onClick={() => changeStep(step - 1)}
          >
            <span className="icon-arrow-button-left" />
          Back
          </button>
        )}
      <button
        type="button"
        className="btn btn-white"
        onClick={closeModal}
      >
        Cancel
      </button>
      {step < 4
        ? (
          <button type="submit" className="btn btn-purple">
          Next
          </button>
        )
        : (
          <React.Fragment>
            <button type="submit" className="btn btn-purple ml-2">Save</button>
            <button
              type="submit"
              className="btn btn-purple"
              onClick={handleSubmit(values => onSubmit({ ...values, invite: true }))}
            >
            Invite
            </button>
          </React.Fragment>
        )
      }

    </div>
  )
}
const TypeEmployment = ({ options }) => (
  <React.Fragment>
    <h6>Please select type of employment</h6>
    <div className="form-group">
      <Field
        name="employment_type"
        id="employment_type"
        options={options}
        component={SelectField}
        validate={[required]}
      />
    </div>
  </React.Fragment>
)

const CompanyEmplyee = ({ options }) => (
  <React.Fragment>
    <h6>From which company is the employee?</h6>
    <div className="form-group">
      <Field
        name="company_type"
        id="company_type"
        options={options}
        component={SelectField}
        validate={[required]}
      />
    </div>
  </React.Fragment>
)

const MemberDetails = ({ disciplines }) => (
  <div>
    <h6>Please enter member details</h6>
    <Field
      component={InputField}
      name="first_name"
      id="first_name"
      className="form-group"
      placeholder="First Name"
      validate={[required]}
      label="Member details"
    />
    <Field
      component={InputField}
      name="last_name"
      id="last_name"
      className="form-group"
      placeholder="Last name"
      validate={[required]}
    />
    <Field
      component={InputField}
      name="email"
      id="email"
      className="form-group"
      placeholder="Email address"
      validate={[required, email]}
    />
    <div className="form-row">
      <Field
        component={InputField}
        className="form-group col-md-4"
        name="phone_code"
        id="phone_code"
        placeholder="+00"
      />
      <Field
        component={InputField}
        className="form-group col-md-8"
        name="phone_number"
        id="phone_number"
        placeholder="Phone number"
      />
    </div>
    <div className="form-row">
      <Field
        component={InputField}
        className="form-group col-md-6"
        name="job_title"
        id="job_title"
        placeholder="Job title"
      />
      <Field
        component={SelectField}
        className="form-group col-md-6"
        name="discipline_id"
        id="discipline_id"
        options={disciplines}
        placeholder="Discipline"
      />
    </div>
  </div>
)

const CompanyData = () => (
  <div>
    <h6>Please enter company data</h6>
    <FormSection name="company_address">
      <AddressFields />
    </FormSection>
  </div>
)

function AddMember({ handleSubmit, closeModal }) {
  const dispatch = useDispatch()
  const { projectId } = useParams()
  const [step, setStep] = useState(1)
  useEffect(() => { dispatch(startCreatingProjectMember(projectId)) }, [dispatch, projectId])
  const emplTypes = useSelector(({ projectMembers: { creating } }) => creating.employment_types)
  const companyTypes = useSelector(({ projectMembers: { creating } }) => creating.company_types)
  const disciplineOptions = useSelector(({ projectMembers: { disciplines } }) => disciplines)

  const nextStep = useCallback(() => {
    setStep(step + 1)
  }, [step])

  const changeStep = useCallback(newStep => {
    setStep(newStep)
  }, [])

  const onSubmit = useCallback(values => {
    switch (step) {
    case '1':
      values.creation_step = 'employment_type'
      return
    case '2':
      values.creation_step = 'company_type'
      return
    case '3':
      values.creation_step = 'company_data'
      return
    case '4':
      values.creation_step = 'details'
      return
    default:
      values.creation_step = 'employment_type'
    }

    if (!values.id) {
      dispatch(startCreateProjectMember(values, projectId)).then(nextStep)
    } else if (step === 4) {
      dispatch(startUpdateProjectMember(values, projectId, 'creating')).then(closeModal)
    } else {
      dispatch(startUpdateProjectMember(values, projectId, 'creating')).then(nextStep)
    }
  }, [step, dispatch, projectId, nextStep, closeModal])

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="new-modal">
      <div className="new-modal__header">
        <h4>New member</h4>
      </div>
      <div className="new-modal__body">
        {(() => {
          switch (step) {
          case 1:
            return <TypeEmployment options={emplTypes} />
          case 2:
            return <CompanyEmplyee options={companyTypes} />
          case 3:
            return <CompanyData />
          case 4:
            return <MemberDetails disciplines={disciplineOptions} />
          default:
            return <TypeEmployment />
          }
        })()}
      </div>
      <Footer
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        step={step}
        closeModal={closeModal}
        changeStep={changeStep}
      />
    </form>
  )
}

export default reduxForm({ form: 'project_member_form' })(AddMember)

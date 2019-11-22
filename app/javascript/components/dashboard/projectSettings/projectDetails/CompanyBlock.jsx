import React, { useRef, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { reduxForm, FormSection, resetSection } from 'redux-form'
import CompanyFields from '../../../../elements/forms/CompanyFields'
import NewModal from '../../../../elements/Modal'
import BillingAddress from '../../projectOverview/BillingAddress'
import { startUpdateProject } from '../../../../actions/projectActions'
import { addNotification } from '../../../../actions/notificationsActions'

function ModalButtons({ closeForm }) {
  const dispatch = useDispatch()
  const reset = useCallback(() => {
    dispatch(resetSection('company_form', 'company_data.billing_address'))
  }, [dispatch])

  return (
    <div className='new-modal__footer'>
      <button
        type='button'
        className='btn btn-white-blue clear-form'
        onClick={reset}
      >
        Clear form
        </button>
      <button
        type='button'
        className='btn btn-white'
        onClick={closeForm}
      >
        Cancel
        </button>
      <button type='submit' className='btn btn-purple'>Save</button>
    </div>
  )
}

function CompanyDataButtons({ pristine, openForm }) {
  return (
    <div>
      {!pristine &&
        <button
          type='submit'
          className='btn btn-purple full-wide mb-2'
        >
          Save changes
        </button>}
      <button
        type='button'
        className='btn btn-white-blue full-wide mt-2'
        onClick={openForm}
      >
        Billing address
      </button>
    </div>
  )
}

function BillingModal({ closeForm }) {
  return (
    <FormSection name='company_data'>
      <div className='new-modal'>
        <div className='new-modal__header'><h4>Billing address</h4></div>
        <BillingAddress submitButtons={() => <ModalButtons closeForm={closeForm} />} />
      </div>
    </FormSection>
  )
}

function CompanyBlock({ handleSubmit, pristine }) {
  const ref = useRef()
  const dispatch = useDispatch()
  const [billingForm, setBillingForm] = useState(false)

  const submit = useCallback(values => {
    return dispatch(startUpdateProject(values)).then(() => {
      dispatch(addNotification({ title: 'Projects', text: 'The changes were successfully saved!', type: 'success' }))
      setBillingForm(false)
    })
  }, [dispatch])
  
  return (
    <form
      noValidate={true}
      onSubmit={handleSubmit(submit)}
      className='col-lg-6 company-data-form'
      ref={ref}
    >
      <FormSection name='company_data'>
        <div className='block-title'>
          <span>Company data</span>
        </div>
        <CompanyFields />
        <CompanyDataButtons pristine={pristine} openForm={() => setBillingForm(true)} />
      </FormSection>
      <NewModal
        content={<BillingModal closeForm={() => setBillingForm(false)}/>}
        open={billingForm}
        mountNode={ref.current}
        onClose={() => setBillingForm(false)}
      />
    </form>
  )
}

export default  reduxForm({ form: 'company_form', enableReinitialize: true })(CompanyBlock)

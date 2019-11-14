import React, { useState, useCallback } from 'react'
import { Field, reduxForm } from 'redux-form'
import DatePickerField from '../../../elements/DatePickerField'
import NewModal from '../../../elements/Modal'

const statuses = [
  { name: 'Planning', status: 'active', date: '31-03-2019' },
  { name: 'Development', status: 'available', date: '' },
  { name: 'Execution', status: 'blocked', date: '' },
  { name: 'Operation', status: 'blocked', date: '' }
]

function Card({ name, status, date, openModal }) {
  return (
    <div className={`statuses-card ${status}`} onClick={() => openModal(name)}>
      <label>{name}</label>
      <span className='tab-description'>{date}</span>
    </div>
  )
}

function ModalForDate({ modalTitle, close }) {
  return (
    <React.Fragment>
      <div className='new-modal__body'>
        <h6 className='new-modal__body-title mt-4'>{`When does the project ${modalTitle.toLowerCase()} start?`}</h6>
        <div className='form-group'>
          <Field
            type='text'
            name='employment_type'
            label='Please enter a start date'
            id='employment_type'
            defaultValue='04/23/2019'
            component={DatePickerField}
            className='form-control'
          />
        </div>
      </div>
      <div className='new-modal__footer'>
        <button type='button' className='btn btn-white' onClick={close}>Cancel</button>
        <button type='submit' className='btn btn-purple'>Next</button>
      </div>
    </React.Fragment>
  )
}

function ModalForConfirm({ close, modalTitle, back }) {
  return (
    <React.Fragment>
      <div className='new-modal__body'>
        <h6 className='new-modal__body-title mt-4'>{`Do you want to set the project status to '${modalTitle}'?`}</h6>
      </div>
      <div className='new-modal__footer'>
        <button type='button' className='btn btn-back' onClick={back}>
          <span className='icon-arrow-button-left' />
          Back
        </button>
        <button type='button' className='btn btn-white' onClick={close}>No</button>
        <button type='submit' className='btn btn-purple'>Yes</button>
      </div>
    </React.Fragment>
  )
}

function ModalContent({ modal, submit, ...props}) {
  return (
    <form className='new-modal' noValidate={true} onSubmit={submit}>
      <div className='new-modal__header'>{props.modalTitle}</div>
      {modal < 2 ? <ModalForDate {...props} /> : <ModalForConfirm {...props} />}
    </form>
  )
}

function ProjectStatus({ handleSubmit }) {
  const [modal, toggleModal] = useState(0)
  const [modalTitle, setModalTitle] = useState('')
  
  const submit = useCallback(val => {
    if (modal < 2) {
      toggleModal(2)
      return
    }
    console.log(val)
  }, [])

  const openModal = useCallback(name => {
    toggleModal(1)
    setModalTitle(name)
  }, [])
  return (
    <div id='project-status'>
      <h5 className='my-5'>Project status</h5>
      <span className='tab-description'>Manage project status and start date</span>
      <div className='row my-5'>
        {statuses.map((status, i) => (
          <div className='col-sm-3' key={i}>
            <Card {...status} openModal={openModal}/>
          </div>
        ))}
      </div>
      <span className='tab-description'>Requirements for activation:</span>
      <div className='mt-3'>
        <div className='tab-description d-flex'>
          <span>Terms & Conditions accepted</span>
          <i className='icon-check_3 ml-2' />
        </div>
      </div>
      <div className='mt-3'>
        <div className='tab-description d-flex'>
          <span>Billing address confirmed</span>
          <span className='icon-check_3 ml-2' />
        </div>
      </div>
      <div className='d-flex justify-content-end my-5'>
        <button className='btn btn-move-to-archive'>
          <span className='icon-common-file-lock' />
            Move to archive
        </button>
      </div>
      <NewModal
        content={
          <ModalContent
            close={() => toggleModal(0)}
            back={() => toggleModal(modal - 1)}
            modalTitle={modalTitle}
            modal={modal}
            submit={handleSubmit(submit)}
          />
        }
        open={modal > 0}
        onClose={() => toggleModal(0)}
      />
    </div>
  )
}

export default reduxForm({ form: 'project_status_form', destroyOnUnmount: false })(ProjectStatus)

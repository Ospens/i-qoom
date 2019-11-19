import React, { useRef, useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import NewModal from '../../../../elements/Modal'
import InputField from '../../../../elements/InputField'
import { startCreateFolder } from '../../../../actions/foldersActions'

function ModalTrigger({ handleOpen }) {
  return (
    <button
      type='button'
      className='btn'
      onClick={handleOpen}
    >
      <span className='icon-add_1 mr-2' />
      <span>New folder</span>
    </button>
  )
}

function Content({ handleSubmit, handleClose }) {
  return (
    <form noValidate={true} onSubmit={handleSubmit} className='new-modal'>
      <div className='new-modal__header'>
        <h6>Create new folder</h6>
      </div>
      <div className='new-modal__body'>
        <Field
          name='title'
          label='Define a folder title'
          placeholder='Title'
          component={InputField}
        />
      </div>
      <div className='new-modal__footer'>
        <button
          type='button'
          className='btn btn-white'
          onClick={handleClose}
        >
          Cancel
        </button>
        <button type='submit' className='btn btn-purple'>
          Create
        </button>
      </div>
    </form>
  )
}

function CreateFolder({ trigger, handleSubmit }) {
  const ref = useRef()
  const dispatch = useDispatch()
  const { project_id } = useParams()
  const [open, setOpen] = useState(false)

  const handleClickOpenBtn = useCallback(event => {
    if (ref
      && (event.target.className.includes('openFolderForm') || event.target.closest('.openFolderForm'))) {
      setOpen(true)
    }
  }, [ref])
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOpenBtn)
    return () => { document.removeEventListener('mousedown', handleClickOpenBtn) }
  }, [])
  
  const submit = useCallback(values => {
    return dispatch(startCreateFolder(project_id, values)).then(() => setOpen(false))
  }, [dispatch])

  return (
    <div ref={ref}>
      <NewModal
        content={<Content handleSubmit={handleSubmit(submit)} handleClose={() => setOpen(false)} />}
        trigger={trigger || <ModalTrigger handleOpen={() => setOpen(true)} />}
        open={open}
        onClose={() => setOpen(false)}
        closeOnDimmerClick={false}
      />
    </div>
  )
}

export default reduxForm( { form: 'document_folder' })(CreateFolder)

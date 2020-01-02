import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { destroy } from 'redux-form'
import NewModal from '../../../elements/Modal'
import { startFetchProjects } from '../../../actions/projectActions'
import ModalContent from './ModalContent'

function trigger(toggleOpen) {
  return (
    <button type="button" onClick={toggleOpen}>
      <div className="project-card blank">
        <span className="icon-add_1" />
        <label>Create a new project</label>
      </div>
    </button>
  )
}

function ModalCreateProject() {
  const [modalStep, setModalStep] = useState(0)
  const dispatch = useDispatch()

  const handleClose = useCallback(() => {
    setModalStep(0)
    dispatch(destroy('project_form'))
    dispatch(startFetchProjects())
  }, [dispatch])

  const content = (
    <ModalContent
      step={modalStep}
      changeStep={val => setModalStep(modalStep + val)}
      handleClose={handleClose}
    />
  )

  return (
    <NewModal
      content={content}
      trigger={trigger(() => setModalStep(1))}
      open={modalStep > 0}
      onClose={handleClose}
      closeOnDimmerClick={false}
    />
  )
}

export default ModalCreateProject

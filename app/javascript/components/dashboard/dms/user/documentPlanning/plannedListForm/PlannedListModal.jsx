import React, { useState, useCallback, useEffect } from 'react'
import NewModal from '../../../../../../elements/Modal'
import PlannedListForm from './PlannedListForm'

function PlannedListModal({ initStep = 1, open, setOpen }) {
  const [step, setStep] = useState(initStep)
  useEffect(() => {
    setStep(initStep)
  }, [initStep])

  const handleClose = useCallback(() => {
    setOpen(false)
    setStep(initStep)
  }, [initStep, setOpen])

  const handleBack = useCallback(() => {
    setStep(step - 1)
  }, [step])

  const handleNext = useCallback(() => {
    setStep(step + 1)
  }, [step])
  const content = (
    <PlannedListForm
      handleClose={handleClose}
      handleBack={handleBack}
      handleNext={handleNext}
      step={step}
    />
  )
  return (
    <NewModal
      content={content}
      open={open}
      onClose={handleClose}
      closeOnDimmerClick={false}
    />
  )
}

export default PlannedListModal

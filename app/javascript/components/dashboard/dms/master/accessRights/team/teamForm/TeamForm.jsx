import React, { useState, useCallback } from 'react'
import NewModal from '../../../../../../../elements/Modal'
import Content from './Content'

function TeamForm({
  initStep = 1, teamId, open, setOpen
}) {
  const [step, setStep] = useState(initStep)

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
    <Content
      handleClose={handleClose}
      handleBack={handleBack}
      handleNext={handleNext}
      step={step}
      teamId={teamId}
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

export default TeamForm

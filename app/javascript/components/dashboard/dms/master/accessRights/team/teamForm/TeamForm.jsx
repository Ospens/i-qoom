import React, { useState, useCallback } from 'react'
import NewModal from '../../../../../../../elements/Modal'
import Content from './Content'

function TeamForm({ initStep = 1, teamId, open, setOpen }) {
  const [step, setStep] = useState(initStep)

  const handleClose = useCallback(() => {
    setOpen(false)
    setStep(initStep)
  }, [])

  const handleBack = useCallback(() => {
    setStep(step - 1)
  }, [step])

  const handleNext = useCallback(() => {
    setStep(step + 1)
  }, [step])

  return (
    <NewModal
      content={
        <Content
          handleClose={handleClose}
          handleBack={handleBack}
          handleNext={handleNext}
          step={step}
          teamId={teamId}
        />}
      open={open}
      onClose={handleClose}
      closeOnDimmerClick={false}
    />
  )
}

export default TeamForm

import React, { useCallback, useEffect } from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import {
  reduxForm,
  Field
} from 'redux-form'
import { required } from '../../../../../elements/validations'
import InputField from '../../../../../elements/InputField'
import { updateProjectCode } from '../../../../../actions/projectActions'
import { fields, placeholders, freeTextPlaceholders } from './Content'

const submitCodification = () => { console.log() }

function CodeStructure({
  submitFailed,
  initialize,
  disabled,
  pristine,
  reset,
  handleSubmit,
  match: { params: { project_id } }
}) {
  const dispatch = useDispatch()
  const project_code = useSelector(state => state.projects.current.project_code)
  const dmsSections = useSelector(state => state.projects.current.dmsSections)
  
  useEffect(() => {
    if (!project_code) return 

    initialize({ project_code: [project_code[0], project_code[1], project_code[2]] })
  }, [project_code])

  const submitCodification = useCallback(values => {
    const code = values.project_code.join('').toUpperCase()
    dispatch(updateProjectCode(project_id, code))
  }, [dispatch])

  return (
    <form
      noValidate={true}
      className={classnames({ 'codification-codes-title-row-not-prisitne': !pristine })}
      onSubmit={handleSubmit(submitCodification)}
    >
      <div className='codification-codes-title-row'>
        {fields.map((el, i) => {
          const labelText = i === 0
            ? 'Change project code'
            : i === 1
              ? 'Code structure'
              : ''
          return (
            <React.Fragment key={i}>
              <div className={classnames('codification-codes-title-column', el.className, { disabled })}>
                {!disabled && <label>{labelText}</label>}
                <span className='codification-codes-title-column__title'>
                  {el.title}
                </span>
                {i === 0 &&
                <Popup
                  className={classnames(
                    'for-project-code',
                    { 'error-tooltip-container': !project_code && submitFailed },
                    { 'dark-tooltip-container': (!project_code && !submitFailed) || project_code }
                  )}
                  trigger={
                    <div
                      className={classnames(
                        'codification-codes-title-column__code', 
                        { 'project-code-not-defined': !project_code && project_code !== undefined }
                      )}
                    >
                      <Field
                        component={InputField}
                        name='project_code[0]'
                        placeholder='M'
                        maxLength='1'
                        validate={[required]}
                        justHightlight={true}
                        disabled={disabled}
                      />
                      <Field
                        component={InputField}
                        name='project_code[1]'
                        placeholder='V'
                        maxLength='1'
                        validate={[required]}
                        justHightlight={true}
                        disabled={disabled}
                      />
                      <Field
                        component={InputField}
                        name='project_code[2]'
                        placeholder='P'
                        maxLength='1'
                        validate={[required]}
                        justHightlight={true}
                        disabled={disabled}
                      />
                    </div>}
                  position='right center'
                  open={!dmsSections}
                  hideOnScroll
                >
                  <div className='tooltip-block dark'>
                    <div className='tooltip-text-block'>
                      {project_code
                        ? <span>Now add at least one position to these codification fields</span>
                        : <span>Please define the Project code</span>}
                    </div>
                  </div>
                </Popup>}
                {i !== 0 && 
                <div className='codification-codes-title-column__code'>
                  {(() => {
                    if (disabled) {
                      return placeholders(el)
                    } else if (i === 6) {
                      return freeTextPlaceholders()
                    } else {
                      return placeholders(el)
                    }
                  })()}
                </div>}
              </div>
              {i !== 6 &&
              <div className={classnames('codification-codes-title-column dash', { disabled })}>
                {!disabled && <div />}
                <div className='codification-codes-title-column__title' />
                <span className='dash-symbol'>&mdash;</span>
              </div>}
            </React.Fragment>
          )
        })}
      </div>
      {!pristine &&
      <div className='confirmation-block'>
        <span>
          You made changes to the project codification. This will influence
          all future documents. Are you sure?
        </span>
        <div className='ml-5'>
          <button type='button' className='btn btn-white' onClick={reset}>Discard</button>
          <button type='submit' className='btn btn-purple ml-2'>Apply changes</button>
        </div>
      </div>}
    </form>
  )
}

export default withRouter(reduxForm({
  form: 'convention_code_form',
  onSubmit: submitCodification // submit function must be passed to onSubmit
})(CodeStructure))

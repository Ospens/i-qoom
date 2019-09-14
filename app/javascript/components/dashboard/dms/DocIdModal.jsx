import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import {
  formValueSelector,
  getFormInitialValues,
  reduxForm,
  Field,
  initialize
} from 'redux-form'
import { formvalue } from './user/DocumentsAndFiles'
import NewModal from '../../../elements/Modal'
import InputField from '../../../elements/InputField'
import SelectField from '../../../elements/SelectField'
import { infoNotify } from '../../../elements/Notices'
import DocumentIdInputs from './DocumentIdInputs'
import { fileNameReg, initValues } from './initDocId'

class DocIdModal extends Component {
  state = {
    popup: false,
  }

  componentWillMount() {
    const { info } = this.props
    if (!info) return

    info.forEach(el => infoNotify(el.message))
  }
  
  hadlePopup = () => this.setState(prevState => ({ popup: !prevState.popup }))

  updateForm = (index, files) => {
    const { documentFields, initialize } = this.props
    documentFields[index].file = files
    initialize(initValues(documentFields))
  }

  fileField = ({ input, index }) => {
    return (
      <div className='form-group'>
        <div className='d-flex mb-2'>
          <label className='mb-0 mr-2'>Uploaded file</label>
          <label htmlFor={input.name} className='blue'>Remove and upload file</label>
        </div>
        <input
          id={input.name}
          type="file"
          accept="application/pdf"
          onChange={e => {
            const file = e.target.files[0]
            if (file.name.match(fileNameReg)) {
              input.onChange(e.target.files)
              this.updateForm(index, e.target.files)
              return
            }
            infoNotify('Filename is not valid')
          }}
          className='d-none'
        />
        <div className='form-group file-name-row'>
          <i className='svg-icon file-pdf-icon' />
          <div className='ml-2'>
            {/*value.value.map((el, i) => {
              if (false) {
                
                TODO: Disabled and can be removed soon

                return (
                  <Popup
                    key={i}
                    trigger={<span onClick={this.hadlePopup}>{el}</span>}
                    open={popup}
                    on='click'
                    className='dark-tooltip-container small-font'
                    position='bottom center'
                    hideOnScroll
                  >
                    <div className='tooltip-block dark'>
                      WRONG PROJECT CODE: CHANGED TO MWP
                    </div>
                  </Popup>
                )
              }
              return <span key={i}>{el}</span>
            })*/}
            <span>{input.value[0].name}</span>
          </div>
        </div>
      </div>
    )
  }

  changeSelectField = (value, options, index) => {
    const { change } = this.props

    const newValues = options.map(option => {
      const selected = option.value == value
      return {
        ...option,
        selected
      }
    })

    change(`fields[${index}].document_field_values`, newValues)
  }

  selectField = (index, field) => {
    const fieldValues = field.document_field_values
    const uniqName = `fields[${index}].value`
    return (
      <Field
        name={uniqName}
        options={fieldValues}
        onChange={v => this.changeSelectField(v, fieldValues, index)}
        placeholder={field.command}
        component={SelectField}
        label={field.title}
      />
    )
  }

  renderDocInfo = () => {
    const { documentFields, project_code } = this.props

    const origCompanyValue = formvalue(documentFields, 'originating_company')
    const docTypeValue = formvalue(documentFields, 'document_type')
    const docNumberValue = formvalue(documentFields, 'document_number')
    const disciplineValue = formvalue(documentFields, 'discipline')
    
    return (
      <div className='form-group'>
        <label>Define a Document-ID to add information</label>
        <DocumentIdInputs
          projectCode={project_code}
          origCompanyValue={origCompanyValue}
          disciplineValue={disciplineValue}
          docTypeValue={docTypeValue}
          docNumberValue={docNumberValue}
        />
      </div>
    )
  }

  handleSubmit = values => {
    const { mainFields, initMainForm } = this.props

    const newFields = mainFields.map(el => {
      const field = values.fields.find(v => v.codification_kind === el.codification_kind)
      if (!field) return el

      return field
    })
    
    const newValues = {
      document_fields: newFields,
      title: values.title,
      project_code: values.project_code,
      generate_id: false,
    }

    initMainForm(newValues)
  }

  renderContent = () => {
    const { initialValues, handleSubmit, toggleModal } = this.props
    if (!initialValues.fields) return

    const nativeFileIndex = initialValues.fields.findIndex(el => el.codification_kind === 'document_native_file')
    const revisionIndex = initialValues.fields.findIndex(el => el.codification_kind === 'revision_number')
    const docNumIndex = initialValues.fields.findIndex(el => el.codification_kind === 'document_number')

    return (
      <form noValidate={true} onSubmit={handleSubmit(this.handleSubmit)} className='new-modal'>
        <div className='new-modal__header'>
          <h4>Document ID via uploaded file code</h4>
        </div>
        <div className='new-modal__body'>
          <div className='upload-file-row'>
            <Field
              index={nativeFileIndex}
              component={this.fileField}
              name={`fields[${nativeFileIndex}].file`}
            />
          </div>

          {this.renderDocInfo()}

          <div className='form-group'>
            <Field
              component={InputField}
              name='title'
              label='Title'
              placeholder='Define a title'
            />
          </div>

          {initialValues.fields.map((el, i) => {
            if (![
              'document_type',
              'originating_company',
              'discipline'
            ].includes(el.codification_kind)) return
            
            return (
              <div className='form-group' key={i}>
                {this.selectField(i, el)}
              </div>
            )
          })}

          <div className='row'>
            <div className='col-6'>
              <div className='form-group'>
                <Field
                  component={InputField}
                  step='0.1'
                  type='number'
                  name={`fields[${docNumIndex}].value`}
                  label='Define a document number'
                  placeholder='Document number'
                />
              </div>
            </div>
            <div className='col-6'>
              <div className='form-group'>
                <Field
                  component={InputField}
                  step='1'
                  type='number'
                  name={`fields[${revisionIndex}].value`}
                  label='Define a revision number'
                  placeholder='Revision number'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='new-modal__footer'>
          <button
            type='button'
            className='btn btn-white'
            onClick={() => toggleModal()}
          >
            Decline
          </button>
          <button type='submit' className='btn btn-purple'>Accept</button>
        </div>
      </form>
    )
  }

  render() {
    const { open, toggleModal } = this.props
    return (
      <NewModal
        content={this.renderContent()}
        open={open}
        onClose={() => toggleModal()}
      />
    )
  }
}

const selector = formValueSelector('doc_id_form')
const mainFormselector = formValueSelector('document_form')

const mapStateToProps = state => ({
  initialValues: getFormInitialValues('doc_id_form')(state) || [],
  documentFields: selector(state, 'fields'),
  mainFields: mainFormselector(state, 'document_fields'),
  info: selector(state, 'info'),
  project_code: selector(state, 'project_code')
})

const mapDispatchToProps = dispatch => ({
  initMainForm: values => dispatch(initialize('document_form', values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'doc_id_form' })(DocIdModal))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getFormSubmitErrors,
  formValueSelector,
  Field
} from 'redux-form'
import SelectField from '../../../../elements/SelectField'
import CheckboxField from '../../../../elements/CheckboxField'
import DatePickerField from '../../../../elements/DatePickerField'
import DropZoneField from '../../../../elements/DropZoneField'
import InputField from '../../../../elements/InputField'
import TextAreaField from '../../../../elements/TextAreaField'

const ddItems = [
  {
    value: 'STX',
    label: 'STX'
  },
  {
    value: 'EOS',
    label: 'EOS'
  }
]

class DocDocumentsAndFiles extends Component {
  state = {  }

  renderInputByType = field => {
    const uniqName = `${field.column}_${field.row}`
    if (field.kind === 'upload_field') {
      return (
        <Field
          type='file'
          name={uniqName}
          id={uniqName}
          component={DropZoneField}
          label={field.title}
        />
      )
    } else if (field.kind === 'select_field') {
      return (
        <Field
          name={field.codification_kind || uniqName}
          id={uniqName}
          options={field.document_field_values_attributes}
          placeholder={field.command}
          component={SelectField}
          label={field.title}
        />
      )
    } else if (field.kind === 'textarea_field') {
      return (
        <TextAreaField
          name={uniqName}
          id={uniqName}
          placeholder={field.command}
          label={field.title}
        />
      )
    } else if (field.kind === 'date_field') {
      return (
        <Field
          component={InputField}
          name={uniqName}
          id={uniqName}
          placeholder={field.command}
          component={DatePickerField}
          label={field.title}
        />
      )
    } else {
      return (
        <Field
          component={InputField}
          name={field.codification_kind || uniqName}
          id={uniqName}
          placeholder={field.command}
          label={field.title}
        />
      )
    }
  }

  render() {
    const {
      submitErrors,
      nextStep,
      origCompanyValue,
      disciplineValue,
      docTypeValue,
      docNumberValue,
      fields: { grouped_fields }
    } = this.props

    return (
      <React.Fragment>
        <div className='dms-content__header p-4'>
          <h4>Add documents data & files</h4>
          <div className='dms-content__project-phases'>
            <span>Project phases</span>
            <ul className='row mx-0'>
              <li className='col-3 active'>
                <button>
                  Planning
                </button>
              </li>
              <li className='col-3'>
                <button>
                  Development
                </button>
              </li>
              <li className='col-3'>
                <button>
                  Execution
                </button>
              </li>
              <li className='col-3'>
                <button>
                  Operation
                </button>
              </li>
            </ul>
          </div>
        </div>

        <form className='form-body p-4'>
          <div className='row new-document-table'>

            <div className='col-6'>
              <div className='form-group'>
                <label>Pleace select or generate Document ID</label>

                <div className='input-container'>
                  <div className='document-id-code'>
                    <input
                      className='form-control'
                      type='text'
                      id='document_id_name'
                      value='MWP'
                      disabled
                    />
                  </div>
                  <div className='document-id-code'>
                    <input
                      className='form-control'
                      type='text'
                      id='document_id_orig_company'
                      placeholder='XXX'
                      value={origCompanyValue || ''}
                      disabled
                    />
                  </div>
                  <div className='document-id-code'>
                    <input
                      className='form-control'
                      type='text'
                      id='document_id_discipline'
                      placeholder='XXX'
                      value={disciplineValue || ''}
                      disabled
                    />
                  </div>
                  <div className='document-id-code'>
                    <input
                      className='form-control'
                      type='text'
                      id='document_id_doc_type'
                      placeholder='XXX'
                      value={docTypeValue || ''}
                      disabled
                    />
                  </div>
                  <div className='document-id-code'>
                    <input
                      className='form-control'
                      type='text'
                      id='document_id_doc_number'
                      placeholder='XXX'
                      value={docNumberValue || ''}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className='form-group'>
                <CheckboxField
                  name='generate_id'
                  checkBoxId='generate_id'
                  labelClass='form-check-label mr-2'
                  text='Generate Document ID through file code'
                  errorField={submitErrors}
                />
              </div>
              {grouped_fields[1].map((field, index) => (
                <div className='form-group' key={index}>
                  {this.renderInputByType(field)}
                </div>
              ))}

            </div>

            <div className='col-6'>
              {grouped_fields[2].map((field, index) => (
                <div className='form-group' key={index}>
                  {this.renderInputByType(field)}
                </div>
              ))}
            </div>
          </div>

        </form>
        <div className='dms-footer'>
          <button type='button' className='btn btn-white'>Cancel</button>
          <button
            type='submit'
            className='btn btn-purple'
            onClick={nextStep}
          >
            Next
          </button>
        </div>
      </React.Fragment>
    )
  }
}

const selector = formValueSelector('document_form')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('document_form')(state),
  fields: state.documents.newDocumentFields,
  origCompanyValue: selector(state, 'originating_company'),
  disciplineValue: selector(state, 'discipline'),
  docTypeValue: selector(state, 'document_type'),
  docNumberValue: selector(state, 'document_number')
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DocDocumentsAndFiles)

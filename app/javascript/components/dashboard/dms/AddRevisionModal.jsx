import React from 'react'
import ReactSVG from 'react-svg'
import ModalComponent from '../../../elements/ModalComponent'
import InputField from '../../../elements/InputField'
import DatePickerField from '../../../elements/DatePickerField'
import { reduxForm, Field } from 'redux-form'

function AddRevisionModal() {
  return (
    <div>
      <ModalComponent>
        <div className='doc-id-via-uploaded-file-code'>
          <h4>Document ID via uploaded file code - Add revision</h4>

          <div className='form-group mb-4'>
            <label>
              Document ID matches with the following document.
              Do you want to update the revision?
              </label>

            <div className='input-container'>
              <Field
                className='document-id-code'
                component={InputField}
                name='document_id'
                id='document_id'
                placeholder='MWP'
                disabled
              />
              <Field
                className='document-id-code'
                component={InputField}
                name='document_id'
                id='document_id'
                placeholder='STX'
              />
              <Field
                className='document-id-code'
                component={InputField}
                name='document_id'
                id='document_id'
                placeholder='EOS'
              />
              <Field
                className='document-id-code'
                component={InputField}
                name='document_id'
                id='document_id'
                placeholder='XXX'
                disabled
              />
              <Field
                className='document-id-code'
                component={InputField}
                name='document_id'
                id='document_id'
                placeholder='XXXX'
                disabled
              />
            </div>
          </div>

          <div className='upload-file-row mb-4'>
            <label>Original file code</label>
            <div className='file-name-row'>
              <ReactSVG
                svgStyle={{ height: 20, width: 20, marginRight: 20 }}
                src={'pdfIcon'}
                className='td-files-icon'
              />
              <span>XYY-AAA-LET-YYY-1234_01-weird_data.pdf</span>
            </div>
          </div>

          <div className='upload-file-row mb-4'>
            <div className='upload-remove-buttons'>
              <button className='btn'>Recommended file code</button>
              <button className='btn'>Remove and upload file</button>
            </div>
            <div className='file-name-row'>
              <ReactSVG
                svgStyle={{ height: 20, width: 20, marginRight: 20 }}
                src={'pdfIcon'}
                className='td-files-icon'
              />
              <span>XYY-AAA-LET-YYY-1234_01-weird_data.pdf</span>
            </div>
          </div>

          <div className='row'>
            <div className='col-8'>
              <div className='form-group'>
                <Field
                  step='1'
                  type='number'
                  name='revision_number'
                  id='revision_number'
                  label='Define a revision number'
                />
              </div>
            </div>

            <div className='col-4'>
              <div className='form-group'>
                <Field
                  component={InputField}
                  name='employment_type'
                  label='Revision Date*'
                  id='employment_type'
                  defaultValue='04/23/2019'
                  component={DatePickerField}
                  className='form-control'
                />
              </div>
            </div>
          </div>

          <button className='btn doc-via-file-code__edit-document-btn'>Edit document</button>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-white'>Cancel & upload regularly</button>
          <button type='submit' className='btn btn-purple'>Update</button>
        </div>
      </ModalComponent>
    </div>
  )
}

export default reduxForm({ form: 'document_form', destroyOnUnmount: false })(AddRevisionModal)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import ModalComponent from '../../../elements/ModalComponent'
import InputField from '../../../elements/InputField'
import SelectField from '../../../elements/SelectField'
import pdfIcon from '../../../images/office-file-pdf'
import {
  getFormSubmitErrors,
  reduxForm,
  Field
} from 'redux-form'

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

class DocIdModal extends Component {

  render() {
    const { submitErrors } = this.props
    return (
      <div>
        <ModalComponent>
          <div className='doc-id-via-uploaded-file-code'>
            <h4>Document ID via uploaded file code</h4>
            <div className='upload-file-row'>
              <div className='upload-remove-buttons'>
                <button className='btn'>Uploaded file</button>
                <button className='btn'>Remove and upload file</button>
              </div>
              <div className='file-name-row'>
                <ReactSVG
                  svgStyle={{ height: 20, width: 20, marginRight: 20 }}
                  src={pdfIcon}
                  className='td-files-icon'
                />
                <span>XYY-AAA-LET-YYY-1234_01-weird_data.pdf</span>
              </div>
            </div>

            <div className='form-group'>
              <label>Pleace select or generate Document ID</label>

              <div className='input-container'>
                <InputField
                  className='document-id-code'
                  type='text'
                  name='document_id'
                  id='document_id'
                  placeholder='MWP'
                  disabled
                />
                <InputField
                  className='document-id-code'
                  type='text'
                  name='document_id'
                  id='document_id'
                  placeholder='STX'
                />
                <InputField
                  className='document-id-code'
                  type='text'
                  name='document_id'
                  id='document_id'
                  placeholder='EOS'
                />
                <InputField
                  className='document-id-code'
                  type='text'
                  name='document_id'
                  id='document_id'
                  placeholder='XXX'
                  disabled
                />
                <InputField
                  className='document-id-code'
                  type='text'
                  name='document_id'
                  id='document_id'
                  placeholder='XXXX'
                  disabled
                />
              </div>
            </div>

            <div className='form-group'>
              <InputField
                type='text'
                name='city'
                id='city'
                errorField={submitErrors}
                placeholder='Title'
                label='Type in title'
              />
            </div>
            <div className='form-group'>
              <Field
                name='document_type'
                id='document_type'
                value={'STX'}
                options={ddItems}
                errorField={submitErrors}
                component={SelectField}
                placeholder='E-mail'
                label='Select an originating company*'
              />
            </div>

            <div className='form-group'>
              <Field
                name='document_type'
                id='document_type'
                value={'STX'}
                options={ddItems}
                errorField={submitErrors}
                component={SelectField}
                placeholder='E-mail'
                label='Select a discipline*'
              />
            </div>

            <div className='form-group'>
              <Field
                name='document_type'
                id='document_type'
                value={'STX'}
                options={ddItems}
                errorField={submitErrors}
                component={SelectField}
                placeholder='E-mail'
                label='Select a document type*'
              />
            </div>

            <div className='row'>
              <div className='col-6'>
                <div className='form-group'>
                  <InputField
                    step='0.1'
                    type='number'
                    name='document_number'
                    id='document_number'
                    label='Define a document number'
                  />
                </div>
              </div>
              <div className='col-6'>
                <div className='form-group'>
                  <InputField
                    step='1'
                    type='number'
                    name='revision_number'
                    id='revision_number'
                    label='Define a revision number'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-white'>Decline</button>
            <button type='submit' className='btn btn-purple'>Accept</button>
          </div>
        </ModalComponent>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('doc_id_form')(state)
})

export default connect(
  mapStateToProps
)(reduxForm(
  {
    form: 'doc_id_form',
    destroyOnUnmount: false
  })
  (DocIdModal))

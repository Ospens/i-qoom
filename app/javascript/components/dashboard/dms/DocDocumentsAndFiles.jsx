import React, { Component } from 'react'
import { Field } from 'redux-form'
import SelectField from '../../../elements/SelectField'
import CheckboxField from '../../../elements/CheckboxField'
import DatePickerField from '../../../elements/DatePickerField'
import DragAndDropField from '../../../elements/DragAndDropField'
import InputField from '../../../elements/InputField'
import TextAreaField from '../../../elements/TextAreaField'

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

  render() {
    const { submitErrors, orig_company, nextStep } = this.props

    return (
      <React.Fragment>
        <div className='new-document__header p-4'>
          <h4>Add documents data & files</h4>
          <div className='new-project__project-phases'>
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
          <div className='row'>

            <div className='col-6'>
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

              <div className='form-group generate-id-checkbox'>
                <CheckboxField
                  name='generate_id'
                  checkBoxId='generate_id'
                  labelClass='form-check-label mr-2'
                  text='Generate Document ID through file code'
                  errorField={submitErrors}
                />
              </div>

              <div className='form-group'>
                <Field
                  name='orig_company'
                  id='orig_company'
                  value={orig_company}
                  options={ddItems}
                  errorField={submitErrors}
                  component={SelectField}
                  label='Originating company*'
                />
              </div>

              <div className='form-group'>
                <Field
                  name='discipline_company'
                  id='discipline_company'
                  value={orig_company}
                  options={ddItems}
                  errorField={submitErrors}
                  component={SelectField}
                  label='Select a discipline*'
                />
              </div>

              <div className='row'>
                <div className='col-6'>
                  <div className='form-group'>
                    <InputField
                      step='0.1'
                      type='number'
                      name='revision_number'
                      id='revision_number'
                      label='Define a revision number'
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <div className='form-group'>
                    <Field
                      type='text'
                      name='revision_date'
                      id='revision_date'
                      defaultValue='04/23/2019'
                      errorField={submitErrors}
                      component={DatePickerField}
                      className='form-control'
                      labelText='Revision Date*'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='col-6'>
              <div className='form-group'>
                <Field
                  name='document_type'
                  id='document_type'
                  value={orig_company}
                  options={ddItems}
                  errorField={submitErrors}
                  component={SelectField}
                  label='Select a document type*'
                />
              </div>

              <div className='form-group'>
                <InputField
                  type='text'
                  name='document_titile'
                  id='document_titile'
                  placeholder='Title'
                  label='Define a document title*'
                />
              </div>

              <div className='form-group'>
                <Field
                  name='relevance_first'
                  id='relevance_first'
                  value={orig_company}
                  options={ddItems}
                  errorField={submitErrors}
                  component={SelectField}
                  label='Select relevance |'
                />
              </div>

              <div className='form-group'>
                <Field
                  name='relevance_second'
                  id='relevance_second'
                  value={orig_company}
                  options={ddItems}
                  errorField={submitErrors}
                  component={SelectField}
                  label='Select relevance ||'
                />
              </div>

              <div className='form-group'>
                <InputField
                  type='text'
                  name='originator'
                  id='originator'
                  label='Originator*'
                  placeholder='First name, Last name'
                />
              </div>
            </div>

          </div>

          <div className='form-group'>
            <TextAreaField
              name='additional_information'
              id='additional_information'
              placeholder='Information'
              label='Add additional information'
            />
          </div>

          <div className='row'>
            <div className='col-6'>
              <Field
                type='file'
                name='native_file'
                id='native_file'
                label='Add native file here*'
                component={DragAndDropField}
              />
            </div>
            <div className='col-6'>
              <Field
                type='file'
                name='other_file'
                id='other_file'
                label='Add other file here'
                component={DragAndDropField}
              />
            </div>
          </div>
        </form>
        <div className='create-document-footer'>
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
 
export default DocDocumentsAndFiles
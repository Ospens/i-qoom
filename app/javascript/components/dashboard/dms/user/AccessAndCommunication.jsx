import React from 'react'
import { connect } from 'react-redux'
import { getFormSubmitErrors, Field, FieldArray, change } from 'redux-form'
import SelectField from '../../../../elements/SelectField'
import CheckboxField from '../../../../elements/CheckboxField'
import InputField from '../../../../elements/InputField'
import renderDocumentTextEditor from '../../../../elements/DocumentTextEditor'
import { errorNotify } from '../../../../elements/Notices'

const ddItems = [
  {
    value: 'STX',
    title: 'STX'
  },
  {
    value: 'EOS',
    title: 'EOS'
  }
]

const renderField = ({ input: { value } }) => <span>{value}</span>

const email = value => (
  !value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'The E-mail address is not a valid'
    : undefined
)

const updateEmails = (e, fields, discardValue) => {
  if (e.charCode === 13) {
    e.preventDefault()
    const error = email(e.target.value)
    if (error) return errorNotify(error)

    fields.push(e.target.value)
    discardValue()
  }
}

const EmailSubjects = ({ fields, discardValue }) => (
  <React.Fragment>
    <Field
      component={InputField}
      onKeyPress={e => updateEmails(e, fields, discardValue)}
      name='email_addresses'
      id='email_addresses'
      placeholder='E-mail and press Enter'
      label='Enter E-mail addresses*'
    />
    <ul className='document__email_addresses-list'>
      {fields.map((field, index) => (
        <li className='document__email_addresses-list__item' key={index}>
          <Field
            name={field}
            component={renderField}
          />
          <button type='button' onClick={() => fields.remove(index)}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  </React.Fragment>
)

const AccessAndCommunication = ({ submitErrors, backStep, discardValue }) => (
  <React.Fragment>
    <div className='dms-content__header p-4'>
      <h4>Access & communication</h4>
    </div>

    <div className='form-body'>
      <div className='p-4'>
        <div className='form-group'>
          <FieldArray
            name='emails'
            component={props => <EmailSubjects {...props} discardValue={discardValue}/>}
          />
        </div>
        {/*<div className='form-group'>
          <Field
            name='сс'
            id='сс'
            options={ddItems}
            errorField={submitErrors}
            component={SelectField}
            isMulti={true}
            placeholder='E-mail'
            label='CC'
          />
        </div>*/}

        <div className='row'>
          <div className='col-6'>
            <div className='form-group'>
              <Field
                component={InputField}
                name='mail_subject'
                id='mail_subject'
                label='Mail subject'
                placeholder='Define a mail subject'
              />
            </div>
          </div>
          <div className='col-6 subject-like-document'>
            <div className='form-group'>
              <CheckboxField
                name='subject_like_document'
                checkBoxId='subject_like_document'
                labelClass='form-check-label mr-2'
                text='Subject like document'
                errorField={submitErrors}
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-6'>
            <div className='form-group'>
              <Field
                name='isssued_for'
                id='isssued_for'
                options={ddItems}
                errorField={submitErrors}
                component={SelectField}
                label='Issued for...'
              />
            </div>
          </div>
          <div className='col-6' />
        </div>

        <div className='row'>
          <div className='col-6'>
            <div className='form-group'>
              <Field
                name='select_reviewers'
                id='select_reviewers'
                options={ddItems}
                errorField={submitErrors}
                component={SelectField}
                label='Reviewers*'
                placeholder='Select reviwers'
              />
            </div>
          </div>
          <div className='col-6'>
            <div className='form-group'>
              <Field
                name='isssuers_review'
                id='isssuers_review'
                options={ddItems}
                errorField={submitErrors}
                component={SelectField}
                label='Issuers review issuer*'
                placeholder='Define Issuers review issuer'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='form-group'>
        <Field
          name='document_text_editor'
          component={renderDocumentTextEditor}
        />
        
      </div>
    </div>

    <div className='dms-footer'>
      <button type='button' className='btn btn-white' onClick={backStep}>Back</button>
      <button type='button' className='btn btn-white'>Cancel</button>
      <button type='submit' className='btn btn-purple'>Save only</button>
      <button type='submit' className='btn btn-purple'>Save & send</button>
    </div>
  </React.Fragment>
)

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('document_form')(state)
})

const mapDispatchToProps = dispatch => ({
  discardValue: () => dispatch(change('document_form', 'email_addresses', null))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessAndCommunication)

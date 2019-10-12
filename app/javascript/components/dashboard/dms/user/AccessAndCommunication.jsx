import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formValueSelector, Field, FieldArray, change } from 'redux-form'
import SelectField from '../../../../elements/SelectField'
import InputField from '../../../../elements/InputField'
import CheckField from '../../../../elements/CheckField'
import renderDocumentTextEditor from '../../../../elements/DocumentTextEditor'
import { errorNotify } from '../../../../elements/Notices'

const selector = formValueSelector('document_form')

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
          <button type='button' onClick={() => fields.remove(index)}>
            x
          </button>
        </li>
      ))}
    </ul>
  </React.Fragment>
)

const AccessAndCommunication = ({ backStep }) => {
  const dispatch = useDispatch()
  const emailTitleLikeDocument = useSelector(state => selector(state, 'email_title_like_document'))
  const title = useSelector(state => selector(state, 'title'))

  useEffect(() => {
    if (!emailTitleLikeDocument) return
    
    dispatch(change('document_form', 'mail_subject', title))
  }, [dispatch, title, emailTitleLikeDocument])

  const discardValue = useCallback(() => {
    dispatch(change('document_form', 'email_addresses', null))
  }, [dispatch])


  return (
    <React.Fragment>
      <div className='dms-content__header'>
        <h4>Access & communication</h4>
      </div>

      <div className='form-body'>
        <div>
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
              component={SelectField}
              isMulti={true}
              placeholder='E-mail'
              label='CC'
            />
          </div>*/}

          <div className='row'>
            <div className='col-6'>
              <Field
                component={InputField}
                className='form-group'
                name='mail_subject'
                id='mail_subject'
                label='Mail subject'
                placeholder='Define a mail subject'
                disabled={emailTitleLikeDocument}
                value={'title'}
              />
            </div>
            <div className='col-6 subject-like-document'>
              <Field
                component={CheckField}
                id='email_title_like_document'
                name='email_title_like_document'
                className='form-group m-0'
                labelClass='mr-2'
                text='Subject like document title'
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-6'>
              <Field
                name='isssued_for'
                id='isssued_for'
                className='form-group'
                options={ddItems}
                component={SelectField}
                label='Issued for...'
              />
            </div>
            <div className='col-6' />
          </div>

          <div className='row'>
            <div className='col-6'>
              <Field
                name='select_reviewers'
                id='select_reviewers'
                className='form-group'
                options={ddItems}
                component={SelectField}
                label='Reviewers*'
                placeholder='Select reviwers'
              />
            </div>
            <div className='col-6'>
              <Field
                name='isssuers_review'
                id='isssuers_review'
                className='form-group'
                options={ddItems}
                component={SelectField}
                label='Issuers review issuer*'
                placeholder='Define Issuers review issuer'
              />
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
}

export default AccessAndCommunication

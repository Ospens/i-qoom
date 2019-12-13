import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formValueSelector, Field, FieldArray, change } from 'redux-form'
import SelectField from '../../../../../elements/SelectField'
import InputField from '../../../../../elements/InputField'
import CheckField from '../../../../../elements/CheckField'
import renderDocumentTextEditor from '../../../../../elements/DocumentTextEditor'
import { errorNotify } from '../../../../../actions/notificationsActions'
import { required } from '../../../../../elements/validations'

const selector = formValueSelector('document_form')

const renderField = ({ input: { value } }) => <span>{value}</span>

const email = value => (
  !value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'The E-mail address is not a valid'
    : undefined
)

const EmailSubjects = ({ fields, discardValue }) => {
  const dispatch = useDispatch()

  const updateEmails = useCallback((e, fields, discardValue) => {
    if (e.charCode === 13) {
      e.preventDefault()
      const error = email(e.target.value)
      if (error) return dispatch(errorNotify('Problem', error))

      fields.push(e.target.value)
      discardValue()
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <Field
        component={InputField}
        onKeyPress={e => updateEmails(e, fields, discardValue)}
        name='email_addresses'
        id='email_addresses'
        placeholder='Type in an e-mail and press Enter'
        label='Enter E-mail addresses'
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
}

const AccessAndCommunication = ({ backStep }) => {
  const dispatch = useDispatch()
  const emailTitleLikeDocument = useSelector(state => selector(state, 'email_title_like_document'))
  const reviewStatus = useSelector(state => selector(state, 'review_status'))
  const conventionId = useSelector(state => selector(state, 'convention_id'))
  const reviewStatusValues = useSelector(state => state.documents.current.review_status_options)
  const title = useSelector(state => selector(state, 'title'))
  const users = useSelector(state => state.documents.users)
  const IFI = reviewStatus === 'issued_for_information'
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

          {!conventionId &&
          <div className='row'>
            <div className='col-6'>
              <Field
                name='review_status'
                id='review_status'
                className='form-group'
                options={reviewStatusValues}
                component={SelectField}
                label='Review status*'
                placeholder='Select status'
                validate={[required]}
              />
            </div>
            <div className='col-6' />
          </div>}

          {!conventionId &&
          <div className='row'>
            <div className='col-6'>
              <Field
                name='reviewers'
                id='reviewers'
                className='form-group'
                options={users.map(u => ({ value: u.id, title: `${u.first_name} ${u.last_name}` }))}
                component={SelectField}
                label='Reviewers*'
                placeholder='Select reviwers'
                isMulti={true}
                disabled={IFI}
              />
            </div>
            <div className='col-6'>
              <Field
                name='review_issuers'
                id='review_issuers'
                className='form-group'
                options={users.map(u => ({ value: u.id, title: `${u.first_name} ${u.last_name}` }))}
                component={SelectField}
                label='Issuers review issuer*'
                placeholder='Define Issuers review issuer'
                isMulti={true}
                disabled={IFI}
              />
            </div>
          </div>}
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

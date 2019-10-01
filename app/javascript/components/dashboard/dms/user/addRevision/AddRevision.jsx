import React from 'react'
import { withRouter } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import DMSLayout from '../../DMSLayout'
import { SideBar } from '../showDocument/ShowDocument'
import DropZoneField from '../../../../../elements/DropZoneField'
import InputField from '../../../../../elements/InputField'

function Content() {
  return (
    <div className='show-document bordered'>
      <div className='dms-content__header'>
        <div className='d-flex'>
          <h4>Add new revision:</h4>
          <label className='rounded-label red ml-4'>
            Revision 41
            <i className='icon-Locked ml-2' />
          </label>
          <label className='rounded-label red ml-4'>
            Version 0.0
            <i className='icon-Locked ml-2' />
          </label>
        </div>
      </div>

      <div className='content-body bottom-padding'>

        <h5>Open upload form</h5>

        <div className='form-group col-6 pl-0 mt-4'>
          <Field
            component={InputField}
            name='originator'
            id='originator'
            placeholder='Originator'
            label='Type in originator*'
          />
        </div>

        <div className='row mt-5'>
          <div className='col-6'>
            <Field
              type='file'
              name='native_file'
              id='native_file'
              label='Replace the document file to update revision*'
              component={DropZoneField}
            />
          </div>
          <div className='col-6'>
            <Field
              type='file'
              name='other_file'
              id='other_file'
              label='Add other file here'
              component={DropZoneField}
            />
          </div>
        </div>
      </div>

      <div className='dms-footer'>
        <button type='button' className='btn btn-white'>Cancel</button>
        <button
          type='submit'
          className='btn btn-purple'
        >
          Next
      </button>
      </div>
    </div>
  )
}

function AddRevision({ match: { params: { project_id, document_id } } }) {

  return (
    <DMSLayout
      sidebar={<SideBar documentId={document_id} projectId={project_id} />}
      content={<Content />}
    />
  )
}

export default withRouter(reduxForm({ form: 'revision_form' })(AddRevision))

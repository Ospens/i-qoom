import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import ModalComponent from '../../../elements/ModalComponent'
import InputField from '../../../elements/InputField'
import TextAreaField from '../../../elements/TextAreaField'
import SelectField from '../../../elements/SelectField'
import DropZoneField from '../../../elements/DropZoneField'
import {
  getFormSubmitErrors,
  reduxForm,
  Field,
  formValueSelector
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

class ModalAddComment extends Component {
  render() {
    const { project: { name }, submitErrors, country } = this.props
    return (
      <div>
        <ModalComponent>
          <div className='add-comment-modal'>
            <div className='d-flex flex-column mb-4'>
              <div className="d-flex">
                <h4 className='mb-2'>Add first review comment</h4>
                <div className="d-flex ml-auto">
                  <ReactSVG
                    svgStyle={{ height: 15, width: 15, marginRight: 15 }}
                    src={'searchIcon'}
                  />
                  <ReactSVG
                    svgStyle={{ height: 15, width: 15, marginRight: 15 }}
                    src={'attachIcon'}
                  />
                  <ReactSVG
                    svgStyle={{ height: 15, width: 15, marginRight: 15 }}
                    src={'dotsIcon'}
                  />
                </div>
              </div>
              <label>{name}</label>
              <span>Doument name transcendent ex Morti Ric...</span>
            </div>

            <form>
              <div className='form-group'>
                <Field
                  component={InputField}
                  name='subject'
                  id='subject'
                  errorField={[submitErrors]}
                  placeholder='Eg. helideck costs'
                  label='Type in subject'
                />
              </div>
              <div className='form-group'>
                <Field
                  component={InputField}
                  name='referance'
                  id='referance'
                  errorField={[submitErrors]}
                  placeholder='Eg.Row 01'
                  label='Type in subject'
                />
              </div>

              <div className='row'>
                <div className='col-6'>
                  <Field
                    name='reviewers'
                    id='reviewers'
                    label='Select reviwers*'
                    options={ddItems}
                    value={country}
                    newValue={country}
                    errorField={[submitErrors]}
                    component={SelectField}
                  />
                </div>
                <div className='col-6'>
                  <Field
                    name='issuer'
                    id='issuer'
                    label='Define Issuer*'
                    options={ddItems}
                    value={country}
                    newValue={country}
                    errorField={[submitErrors]}
                    component={SelectField}
                  />
                </div>
              </div>

              <div className='form-group mt-4'>
                <Field
                  type='file'
                  name='file'
                  id='file'
                  label='Add supportive file here'
                  component={DropZoneField}
                />
              </div>

              <div className='form-group mt-4'>
                <Field
                  component={TextAreaField}
                  name='comment'
                  id='comment'
                  errorField={[submitErrors]}
                  placeholder='Comment'
                  label='Type in your comment'
                />
              </div>

              <div className='form-group'>
                <div className='tags-review-label-block'>
                  <label>Add Review tags</label>
                  <input type='text' className='search-input' placeholder='Search' />
                </div>
                <div className='tags-row'>
                  <label className='rounded-label red mr-2'>Red tag</label>
                  <label className='rounded-label yellow mr-2'>Yellow tag</label>
                  <label className='rounded-label coral mr-2'>Coral tag</label>
                  <label className='rounded-label green mr-2'>Green tag</label>
                  <label className='rounded-label gray mr-2'>Gray tag</label>
                  <label className='rounded-label gray mr-2'>Gray tag</label>
                  <label className='rounded-label gray mr-2'>Gray tag</label>
                </div>
                <div className='selected-info-block d-flex justify-content-end'>
                  <span>4</span>&#160;tags selected
                </div>
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-white'>Decline</button>
            <button type='submit' className='btn btn-purple'>Add review comment</button>
          </div>
        </ModalComponent>
      </div>
    )
  }
}

const selector = formValueSelector('comment_form')

const mapStateToProps = (state) => ({
  project: state.projects.current,
  country: selector(state, 'country'),
})

export default connect(mapStateToProps)(reduxForm(
  {
    form: 'comment_form',
  })
  (ModalAddComment))
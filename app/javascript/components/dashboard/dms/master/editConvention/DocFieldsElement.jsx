import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import DropDown from '../../../../../elements/DropDown'
import { Field } from 'redux-form'
import SelectField from '../../../../../elements/SelectField'
import DragAndDropField from '../../../../../elements/DragAndDropField'
import { Popup } from 'semantic-ui-react'
import classnames from 'classnames'
import { actionConventions } from '../../constants'

export default class DocFieldsElement extends Component {

  state = {
    codificationChange: false
  }

  editButton = () => (
    <Popup
      trigger={<button type='button' className="btn edit-button">Edit</button>}
      on='click'
      position='left center'
    >
      <div className='tooltip-block'>
        <span>
          You try to make changes to the codification-section.
          Do you want to jump to codification?
        </span>
        <div className="buttons-row">
          <button className="btn btn-white">Cancel</button>
          <a href="#" className='btn btn-purple'>Go</a>
        </div>
      </div>
    </Popup>
  )

  accessList = () => (
    <Popup
      trigger={<span className='access-limited'>Access limited</span>}
      on='click'
    >
      <div className='tooltip-block'>
        <div className="tooltip-block-title">
          <label className=''>Access limited to</label>
          <button className='btn p-0'>Edit</button>
        </div>
        <ul className='pt-2'>
          <li>Damla Lamm</li>
          <li>Damla Lamm</li>
        </ul>
      </div>
    </Popup>
  )

  renderDocIdFields = () => (
    <React.Fragment>
      <div className="draggable-container">
        <div className='form-group'>
          <label>Pleace select or generate Document ID</label>

          <div className='input-container'>
            <div className="document-id-code">
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='MWP'
                disabled
              />
            </div>
            <div className="document-id-code">
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='STX'
                disabled
              />
            </div>
            <div className="document-id-code">
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='EOS'
                disabled
              />
            </div>
            <div className="document-id-code">
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='XXX'
                disabled
              />
            </div>
            <div className="document-id-code">
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='XXXX'
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div className="draggable-container">
        <div className='form-group'>
          <div className='checkbox-field justify-content-center'>
            <input
              name='generate_id'
              id='generate_id'
              type='checkbox'
              className='form-check-input'
            />
            <label className='form-check-label mr-2' htmlFor='generate_id' />
            <span>Generate Document ID through file code</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )

  renderInpuByType = (field, index) => {
    if (index === 4) {
      return (
        <Field
          type='file'
          name={field.codification_kind}
          id={field.codification_kind}
          component={DragAndDropField}
        />
      )
    } else if (index !== 2) {
      return (
        <React.Fragment>
          <input
            className='form-control'
            type='text'
            name={field.codification_kind}
            id={field.codification_kind}
            placeholder='Title'
          />
        </React.Fragment>
      )
    } else {
      return (
        <Field
          name={field.codification_kind}
          id={field.codification_kind}
          value={{}}
          newValue={{}}
          options={[]}
          component={SelectField}
        />
      )
    }
  }

  render() {
    const { index, field, column } = this.props

    return (
      <Draggable draggableId={`column_${column}_${index}`} index={index}>
        {(provided, snapshot) => (
          <div
            className={classnames("draggable-container", { 'dragging': snapshot.isDragging })}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {field.title === 'test'
              ? this.renderDocIdFields()
              : <div className='form-group'>
                  <div className="d-flex">
                    <DropDown
                      dots={true}
                      className='dropdown-with-icon form-group_drop-down'
                      defaultValues={actionConventions}
                    />
                    <label htmlFor="document_title">{field.title}</label>
                    {index === 3 && this.accessList()}
                  </div>
                  {this.renderInpuByType(field, index)}
                {this.editButton()}
              </div>
              }
          </div>
        )}
      </Draggable>
    )
  }
}

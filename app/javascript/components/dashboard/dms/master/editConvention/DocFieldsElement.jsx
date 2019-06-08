import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import DropDown from '../../../../../elements/DropDown'
import { Field } from 'redux-form'
import ReactSVG from 'react-svg'
import InputField from '../../../../../elements/InputField'
import SelectField from '../../../../../elements/SelectField'
import DragAndDropField from '../../../../../elements/DragAndDropField'
import ModalCreateField from './ModalCreateField'
import trashIcon from '../../../../../images/trash_bucket'
import fieldBelow from '../../../../../images/upload-menu1'
import fieldAbove from '../../../../../images/upload-menu2'
import copyToFolderIcon from '../../../../../images/folder-empty'
import { Popup } from 'semantic-ui-react'
import classnames from 'classnames'

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

  renderInputByType = field => {
    const uniqName = `${field.column}_${field.row}`
    if (field.kind === 'upload_field') {
      return (
        <Field
          type='file'
          name={uniqName}
          id={uniqName}
          component={DragAndDropField}
        />
      )
    } else if (field.kind === 'select_field') {
      return (
        <Field
          name={uniqName}
          id={uniqName}
          options={field.document_field_values}
          placeholder={field.command}
          component={SelectField}
        />
      )
    }  else if (field.kind === 'textarea_field') {
      return (
        <Field
          name={uniqName}
          id={uniqName}
          value={{}}
          newValue={{}}
          options={[]}
          component={SelectField}
        />
      )
    } else if (field.kind === 'date_field') {
      return (
        <Field
          name={uniqName}
          id={uniqName}
          options={[]}
          component={SelectField}
        />
      )
    } else {
      return (
        <InputField
          type='text'
          name={uniqName}
          id={uniqName}
          placeholder={field.command}
        />
      )
    }
  }

  render() {
    const { index, field, column } = this.props
    const { formField } = this.state


    const actionConventions = [
      {
        title: 'New field above',
        icon: fieldAbove,
        onClick: () => this.setState({ formField: true })
      },
      {
        title: 'New field below',
        icon: fieldBelow
      },
      {
        title: 'Copy',
        icon: copyToFolderIcon
      },
      {
        title: 'Delete',
        icon: trashIcon
      }
    ]

    return (
      <Draggable draggableId={`column_${column}_${index}`} index={index}>
        {(provided, snapshot) => (
          <div
            className={classnames("draggable-container", { 'dragging': snapshot.isDragging })}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {formField &&
              <ModalCreateField
                closeModal={() => this.setState({ formField: false })}
                column={column}
                row={index}
              />
            }
            {field.title === 'test'
              ? this.renderDocIdFields()
              : <div className='form-group'>
                  <div className="d-flex">
                    <DropDown
                      dots={true}
                      className='dropdown-with-icon form-group_drop-down'
                    >
                    {actionConventions.map(({ icon, title, onClick }, i) => (
                      <React.Fragment key={i}>
                        <li
                          className='dropdown-item'
                          onClick={onClick}
                        >
                          <ReactSVG
                            svgStyle={{ height: 15, width: 15 }}
                            src={icon}
                          />
                          <span className='item-text'>{title}</span>
                        </li>
                      </React.Fragment>
                    ))}
                    </DropDown>
                    <label htmlFor="document_title">{field.title}</label>
                    {index === 3 && this.accessList()}
                  </div>
                  {this.renderInputByType(field, index)}
                {this.editButton()}
              </div>
              }
          </div>
        )}
      </Draggable>
    )
  }
}

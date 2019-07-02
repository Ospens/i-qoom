import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import { Draggable } from 'react-beautiful-dnd'
import classnames from 'classnames'
import { Field } from 'redux-form'
import ReactSVG from 'react-svg'
import DropDown from '../../../../../elements/DropDown'
import {
  setInitialValuesField,
  removeField
} from '../../../../../actions/conventionActions'
import InputField from '../../../../../elements/InputField'
import SelectField from '../../../../../elements/SelectField'
import DatePickerField from '../../../../../elements/DatePickerField'
import DropZoneField from '../../../../../elements/DropZoneField'
import trashIcon from '../../../../../images/trash_bucket'
import fieldBelow from '../../../../../images/upload-menu1'
import fieldAbove from '../../../../../images/upload-menu2'
import copyToFolderIcon from '../../../../../images/folder-empty'

class DocFieldsElement extends Component {

  editButton = row => {
    const { setInitialValuesField, field, modalCreateField } = this.props
    if (!field.codification_kind) {
      const trigger =
        <button
          type='button'
          className="btn edit-button"
          onClick={() => setInitialValuesField(field)}
        >
          Edit
        </button>
      return (
        modalCreateField(field.column, row, trigger, true)
      )
    } else {
      return (
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
    }
  }

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

  renderInputByType = field => {
    const uniqName = `${field.column}_${field.row}`
    if (field.kind === 'upload_field') {
      return (
        <Field
          type='file'
          name={uniqName}
          id={uniqName}
          component={DropZoneField}
          isDisabled={true}
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
          isDisabled={true}
        />
      )
    } else if (field.kind === 'textarea_field') {
      return (
        <InputField
          type='text'
          name={uniqName}
          id={uniqName}
          placeholder={field.command}
          readOnly={true}
        />
      )
    } else if (field.kind === 'date_field') {
      return (
        <Field
          type='text'
          name={uniqName}
          id={uniqName}
          placeholder={field.command}
          component={DatePickerField}
          readOnly={true}
        />
      )
    } else {
      return (
        <InputField
          type='text'
          name={uniqName}
          id={uniqName}
          placeholder={field.command}
          readOnly={true}
        />
      )
    }
  }

  renderMenuItem = (icon, title) => (
    <li className='dropdown-item'>
      <ReactSVG
        svgStyle={{ height: 15, width: 15 }}
        src={icon}
      />
      <span className='item-text'>{title}</span>
    </li>
  )

  renderCopyElement = () => {
    const { index, column, field, modalCreateField, setInitialValuesField } = this.props
    const copyTrigger = this.renderMenuItem(copyToFolderIcon, 'Copy')
    return (
      <div onClick={() => setInitialValuesField(field)}>
        {modalCreateField(column, index + 1, copyTrigger)}
      </div>
    )
  }

  render() {
    const { index, field, column, modalCreateField, removeField } = this.props

    const actionConventions = [
      {
        title: 'New field above',
        icon: fieldAbove,
        offset: index
      },
      {
        title: 'New field below',
        icon: fieldBelow,
        offset: index + 1
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
            <div className='form-group'>
              <div className="d-flex">
                <DropDown
                  dots={true}
                  className='dropdown-with-icon form-group_drop-down'
                >
                  {actionConventions.map(({ icon, title, offset }, i) => {
                    const trigger = this.renderMenuItem(icon, title)
                    return (
                      <React.Fragment key={i}>
                        {modalCreateField(column, offset, trigger)}
                      </React.Fragment>
                    )
                  })}
                  {!field.codification_kind &&
                  <React.Fragment>
                    {this.renderCopyElement()}
                    <li
                      className='dropdown-item'
                      onClick={() => removeField(column, index)}
                    >
                      <ReactSVG
                        svgStyle={{ height: 15, width: 15 }}
                        src={trashIcon}
                      />
                      <span className='item-text'>Delete</span>
                    </li>
                  </React.Fragment>
                  }
                </DropDown>
                <label htmlFor="document_title">{field.title}</label>
                {/* TODO: disabled on the backed for now */}
                {/* this.accessList() */}
              </div>
              {this.renderInputByType(field, index)}
              {this.editButton(index)}
            </div>
          </div>
        )}
      </Draggable>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setInitialValuesField: (field) => dispatch(setInitialValuesField(field)),
  removeField: (column, row) => dispatch(removeField(column, row))
})

export default connect(null, mapDispatchToProps)(DocFieldsElement)

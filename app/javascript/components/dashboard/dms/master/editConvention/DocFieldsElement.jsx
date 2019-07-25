import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import { Draggable } from 'react-beautiful-dnd'
import classnames from 'classnames'
import {
  getFormSubmitErrors,
  Field
} from 'redux-form'
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
    const { setInitialValuesField, field, openInputForm } = this.props
    return (
      <button
        type='button'
        className='btn edit-button'
        onClick={() => {
          setInitialValuesField(field)
          openInputForm(field.column, row, true)
        }}
      >
        Edit
      </button>
    )
  }

  accessList = () => (
    <Popup
      trigger={<span className='access-limited'>Access limited</span>}
      on='click'
    >
      <div className='tooltip-block'>
        <div className='tooltip-block-title'>
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
        <Field
          component={InputField}
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
        <Field
          component={InputField}
          name={uniqName}
          id={uniqName}
          placeholder={field.command}
          readOnly={true}
        />
      )
    }
  }

  renderMenuItem = (icon, title, col, row) => {
    const { openInputForm } = this.props

    return (
      <li
        className='dropdown-item'
        onClick={() => openInputForm(col, row)}
      >
        <ReactSVG
          svgStyle={{ height: 15, width: 15 }}
          src={icon}
        />
        <span className='item-text'>{title}</span>
      </li>
    )
  }

  renderCopyElement = () => {
    const { index, column, field, setInitialValuesField } = this.props
    return (
      <div onClick={() => setInitialValuesField(field)}>
        {this.renderMenuItem(copyToFolderIcon, 'Copy', column, index + 1)}
      </div>
    )
  }

  render() {
    const {
      index,
      field,
      column,
      removeField,
      disabled,
      submitErrors
    } = this.props

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

    const fieldErrors = submitErrors[`${column}${index}`]

    return (
      <Draggable draggableId={`column_${column}_${index}`} index={index} isDragDisabled={disabled}>
        {(provided, snapshot) => (
          <div
            className={classnames(
              'draggable-container',
              { 'dragging': snapshot.isDragging },
              { 'undraggable': disabled }
            )}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className='form-group'>
              <div className='d-flex'>
                <DropDown
                  dots={true}
                  className='dropdown-with-icon form-group_drop-down'
                >
                  {actionConventions.map(({ icon, title, offset }, i) => {
                    return (
                      <React.Fragment key={i}>
                        {this.renderMenuItem(icon, title, column, offset)}
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
                <label htmlFor='document_title'>{field.title}</label>
                {/* TODO: disable on the backed now */}
                {/* this.accessList() */}
              </div>
              {this.renderInputByType(field, index)}
              <div>
                {fieldErrors && 
                <div className='invalid-feedback convention-feedback'>
                  {fieldErrors.error}
                </div>}
                {this.editButton(index)}
              </div>
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

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('convention_form')(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(DocFieldsElement)

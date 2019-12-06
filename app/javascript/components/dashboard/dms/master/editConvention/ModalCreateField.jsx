import React from 'react'
import NewModal from '../../../../../elements/Modal'
import CreateFieldForm from './CreateFieldForm'

const modalContent = (handleClose, initialValues) => (
  <CreateFieldForm initialValues={initialValues} handleClose={handleClose} />
)
// const title = useSelector(state => selector(state, 'title'))
/* if (limitAccess) {
    return (
      <ModalLimitAccess
        handleBack={() => this.setState({ limitAccess: false })}
        handleClose={handleClose}
        title={title}
      />
    )
  } */


function ModalCreateField({ modalOpen, handleClose, initialValues }) {
  return (
    <NewModal
      content={modalContent(handleClose, initialValues)}
      open={modalOpen}
      onClose={handleClose}
      className="modal-create-field"
      closeOnDimmerClick={false}
    />
  )
}
/*

class ModalCreateField extends Component {

  state = initState

  handleClose = () => {
    const { destroyForm, handleClose } = this.props
    handleClose()
    this.setState({ ...initState })
    destroyForm()
  }


  renderFieldForm = () => {
    const {
      field_type,
      handleSubmit,
      submitErrors,
      initialized,
      codification_kind,
    } = this.props

    // TODO: Change limit access for new field to

    return (
      <form noValidate={true} className='new-modal' onSubmit={handleSubmit(this.handleSubmit)}>
        <div className='new-modal__header'>
          <h6>{initialized ? 'Edit input field' : 'New input field'}</h6>
        </div>
        <div className='new-modal__body'>
          <div className='modal-container__content-block'>
            <div className='form-group'>
              <Field
                component={InputField}
                name='title'
                id='title'
                placeholder='Title (e.g. Discipline)'
                label='Type in title'
                errorField={submitErrors}
                disabled={codification_kind}
                validate={[required]}
              />
            </div>
            <div className='form-group'>
              <Field
                component={InputField}
                name='command'
                id='command'
                placeholder='Command (e.g. Select discipline)'
                label='Type in command'
                errorField={submitErrors}
                disabled={codification_kind}
                validate={[required]}
              />
            </div>

            <div className='form-group'>
              <Field
                name='kind'
                id='kind'
                label='Choose field type'
                placeholder='Field type'
                defaultValue={typeVariants[0]}
                options={typeVariants}
                component={SelectField}
                errorField={submitErrors}
                disabled={codification_kind}
                validate={[required]}
              />
              <div className='d-flex checkboxes-row'>
                <CheckboxField
                  name='required'
                  checkBoxId='required'
                  labelClass='form-check-label mr-2'
                  text='Required field'
                  disabled={codification_kind}
                />
                {field_type === 'select_field' &&
                  <CheckboxField
                    name='enable_multi_selections'
                    name='enable_multi_selections'
                    checkBoxId='enable_multi_selections'
                    labelClass='form-check-label mx-2'
                    text='Enable multi selections'
                  />
                }
              </div>
            </div>
            {field_type === 'select_field' &&
            <div>
              <FieldArray
                name='document_field_values'
                component={DraggableDropDown}
              />
            </div>}
          </div>
        </div>
        <div className='new-modal__footer'>
          <button
            type='button'
            className='btn btn-white'
            onClick={this.handleClose}
          >
            Cancel
          </button>
          <button type='submit' className='btn btn-purple'>
            {initialized ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    )
  }

  renderModalContent = () => {
    const { limitAccess } = this.state
    const { title } = this.props
    if (limitAccess) {
      return (
        <ModalLimitAccess
          handleBack={() => this.setState({ limitAccess: false })}
          handleClose={this.handleClose}
          title={title}
        />
      )
    }

    return this.renderFieldForm()
  }

}
*/


export default ModalCreateField

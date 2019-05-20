import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import ModalComponent from '../../../elements/ModalComponent'
import DatePickerField from '../../../elements/DatePickerField'
import { Field, getFormSubmitErrors, reduxForm } from 'redux-form'
import fileLock from '../../../images/common-file-lock'
import left from '../../../images/arrow-button-left'
import greenCheck from '../../../images/check_3'

const statuses = [
  { name: 'Planning', status: 'active', date: '31-03-2019' },
  { name: 'Development', status: 'available', date: '' },
  { name: 'Execution', status: 'blocked', date: '' },
  { name: 'Operation', status: 'blocked', date: '' }
]

class ProjectStatus extends Component {
  state = { 
    modal: 0,
    modalTitle: ''
  }

  renderModalFordate = () => {
    const { submitErrors } = this.props
    const { modalTitle } = this.state
    return (
      <ModalComponent>
        <div className='new-project-modal'>
          <h4>Planning</h4>
          <form onSubmit={this.props.handleSubmit}>
            <div className='modal-body project-name'>
              <h5 className='mb-5'>{`When does the project ${modalTitle.toLowerCase()} start?`}</h5>
              <div className='form-group'>
                <Field
                  type='text'
                  name='employment_type'
                  labelText='Please enter a start date'
                  id='employment_type'
                  defaultValue='04/23/2019'
                  errorField={submitErrors}
                  component={DatePickerField}
                  className='form-control'
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-white' onClick={this.closeModal}>Cancel</button>
              <button
                type='submit'
                className='btn btn-purple'
                onClick={() => this.setState({ modal: 2 })}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </ModalComponent>
    )
  }

  renderModalForConfirm = () => {
    const { modalTitle } = this.state
    return (
      <ModalComponent>
        <div className='new-project-modal'>
          <h4>Planning</h4>
          <form onSubmit={this.props.handleSubmit}>
            <div className='modal-body project-name'>
              <h2 className='mb-5'>{`Do you want to set the project status to "${modalTitle}"?`}</h2>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-back'
                onClick={() => this.setState({ modal: 1 })}>
                <ReactSVG
                  svgStyle={{ height: 10, width: 10, marginRight: 5 }}
                  src={left}
                />
                Back
              </button>
              <button type='button' className='btn btn-white' onClick={this.closeModal}>No</button>
              <button
                type='submit'
                className='btn btn-purple'
              >
                Yes
              </button>
            </div>
          </form>
        </div>
      </ModalComponent>
    )
  }

  openModal = (name) => {
    this.setState({
      modal: 1,
      modalTitle: name
    })
  }

  closeModal = () => {
    this.setState({
      modal: 0
    })
  }

  renderCard = ({ name, status, date}) => (
    <div className={`statuses-card ${status}`} onClick={() => this.openModal(name)}>
      <label>{name}</label>
      <span className='tab-description'>{date}</span>
    </div>
  )

  render() {
    const { modal } = this.state
    return (
      <div id='project-status'>
        <h5 className='my-5'>Project status</h5>
        <span className='tab-description'>Manage project status and start date</span>
        <div className='row my-5'>
          {statuses.map((status, i) => (
            <div className='col-sm-3' key={i}>
              {this.renderCard(status)}
            </div>
          ))}
        </div>
        <span className='tab-description'>Requirements for activation:</span>
        <div className='mt-4'>
          <span className='tab-description d-flex'>
            Two confirmed administrators
            <ReactSVG
              svgStyle={{ height: 10, width: 10, marginLeft: 10 }}
              src={greenCheck}
            />
            <ReactSVG
              svgStyle={{ height: 10, width: 10, marginLeft: 10 }}
              src={greenCheck}
            />
          </span>
        </div>
        <div className='mt-3'>
          <span className='tab-description d-flex'>
            Terms & Conditions accepted
            <ReactSVG
              svgStyle={{ height: 10, width: 10, marginLeft: 10 }}
              src={greenCheck}
            />
          </span>
        </div>
        <div className='mt-3'>
          <span className='tab-description d-flex'>
            Billing for agreed
            <ReactSVG
              svgStyle={{ height: 10, width: 10, marginLeft: 10 }}
              src={greenCheck}
            />
          </span>
        </div>
        <div className='d-flex justify-content-end my-5'>
          <button className='btn btn-move-to-archive'>
            <ReactSVG
              svgStyle={{ height: 15, width: 15, marginRight: 10 }}
              src={fileLock}
            />
              Move to archive
            </button>
        </div>
        {modal === 1 && this.renderModalFordate()}
        {modal === 2 && this.renderModalForConfirm()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('project_status_form')(state)
})

export default connect(mapStateToProps)(reduxForm({ form: 'project_status_form', destroyOnUnmount: false })(ProjectStatus))
